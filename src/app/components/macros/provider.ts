//
//  provider.ts
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/11/20
//  Copyright 2020 Wess Cope
//

import Store from '../../store'

import {
  FileSystem,
  Env
} from '../../system'

const {fs, path} = FileSystem

import DataAction       from '../../store/action/data'
import ConnectionAction from '../../store/action/connection'


class MacroProvider {
  root = Env.directory.macros

  constructor() {
    fs.ensureDirSync(this.root)

    this.load   = this.load.bind(this)
    this.create = this.create.bind(this)
  }

  loadSync() {
    return fs.readdirSync(this.root)
    .filter(file => fs.statSync(path.join(this.root, file)).isDirectory() == false)
    .filter(file => file.includes('.gcode'))
    .map((file, index) => {
      return {
        title: file.replace('.gcode', ''),
        name: file,
        file: path.join(this.root, file),
        key: index
      }
    })
  }

  load() {
    fs.readdir(this.root, (err, files) => {
      if(err) {
        ReduxDispatch(ConnectionAction.received(`[Error]: ${err}`))
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
          key: index
        }
      })
      
      ReduxDispatch(DataAction.loadMacros(macros))
   })
  }

  create(name:string) {
    fs.ensureFileSync(this.cleanName(name))

    this.load()
  }

  read(name:string):string|null {
    if(!fs.pathExistsSync(name)) {
      ReduxDispatch(ConnectionAction.received(`[Error]: File not found ${name}`))

      return null
    }

    return fs.readFileSync(name).toString()
  }

  save(name:string, content:string) {
    fs.ensureFileSync(name)
    fs.writeFileSync(name, content)

    this.refresh()
  }

  delete(name:string) {
    fs.removeSync(name)
    this.load()
  }

  refresh() {
    this.load()
  }

  run(name:string) {
    const filename  = this.cleanName(name)
    const content   = this.read(filename)
     
    if(!content) { return }

    content.split("\n")
    .map(line => line.trim())
    .forEach(line =>
      ReduxDispatch(
        ConnectionAction.send(line)
      )
    )
  }

  exists(name:string):boolean {
    return fs.pathExistsSync(
      this.cleanName(name)
    )
  }

  cleanName(name:string):string {
    var filename = path.join(this.root, name)

    return filename.includes('.gcode') ? filename : `${filename}.gcode`
  }
}

if(!globalThis.macroProvider) {
  globalThis.macroProvider = new MacroProvider()
}

export default globalThis.macroProvider
