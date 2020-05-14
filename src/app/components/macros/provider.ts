//
//  provider.ts
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/11/20
//  Copyright 2020 Wess Cope
//


import {
  FileSystem,
  Env
} from '../../system'

const {fs, path} = FileSystem

import Action from '../../store/action'

type WalkCallback =  (err: NodeJS.ErrnoException | null, res: {}[]) => void

const walk = (directory: string, parentIndex:number = null, callback: WalkCallback) => {
  const results: {}[] = []
  
	fs.readdir(directory, (err, files) => {
		if (err) {
			throw err;
		}
		
    
    if (files.length == 0) { return callback(null, results); }
    
    let pending = files.length

		files.map(file => path.join(directory, file)).filter((file, index) => {
			if(fs.statSync(file).isDirectory()) {
        
        walk(file, index, (err, children) => {
          const name = path.basename(file)
          
          results.push({
            title:     name,
            key:      index,
            children: children || [],
            isLeaf:   false
          });
          
          if (--pending < 1) {
            callback(null, results)
					}
				})
      }
      
      return fs.statSync(file).isFile()
      
		}).forEach((file, leafIndex) => {
      const name = path.basename(file)

      results.push({
        title: name.replace('.gcode', ''),
        name: name,
        file: file,
        key: `${parentIndex}-${leafIndex}`,
        isLeaf: true
      })
      
			if (!--pending) {
				callback(null, results)
			}
		})
	})
}

export default class {
  root = Env.directory.macros

  constructor() {
    fs.ensureDirSync(this.root)

    this.load   = this.load.bind(this)
    this.create = this.create.bind(this)
  }

  load() {
    fs.readdir(this.root, (err, files) => {
      if(err) {
        console.error(err)
        return
      }

      const macros = files
      .filter(file => fs.statSync(path.join(this.root, file)).isDirectory() == false)
      .filter(file => file.includes('.gcode'))
      .map((file, index) => {
        return {
          title: file.replace('.gcode', ''),
          name: file,
          file: path.join(this.root, file),
          key: index,
          isLeaf: true
        }
      })
      
      ReduxDispatch(
        Action.loadMacros(macros)
      )
    })
  }

  create(name:string) {
    fs.ensureFileSync(this.cleanName(name))

    this.load()
  }

  read(name:string):string|null {
    console.log("Reading: ", name)
    
    if(!fs.pathExistsSync(name)) {
      console.error("File not found: ", name)

      return
    }

    return fs.readFileSync(name).toString()
  }

  save(name:string, content:string) {
    fs.ensureFileSync(name)
    fs.writeFileSync(name, content)
  }

  delete(name:string) {
    fs.removeSync(name)
    this.load()
  }

  refresh() {
    this.load()
  }

  exists(name:string):boolean {
    return fs.pathExistsSync(
      this.cleanName(name)
    )
  }

  cleanName(name:string):string {
    var filename = name

    if(name.includes('macros') == false) {
      filename = path.join(this.root, filename)
    }

    return filename.includes('.gcode') ? filename : `${filename}.gcode`
  }
}
