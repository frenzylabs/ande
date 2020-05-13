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
    walk(this.root, null, (err, res) => {
      if(err) {
        console.log(err)
        return
      }

      ReduxDispatch(
        Action.loadMacros(res)
      )
    })

  }

  create(name:string, isDir:boolean = false) {
    if(isDir) {
      fs.ensureDirSync(
        path.join(
          this.root, 
          name
        )
      )  
    } else {
      fs.ensureFileSync(
        path.join(
          this.root,
          name
        )
      )
    }

    this.load()
  }

  read(name:string):string|null {
    if(!fs.pathExistsSync(name)) {
      console.error("File not found: ", name)

      return
    }

    return fs.readFileSync(name).toString()
  }
}
