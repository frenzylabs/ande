//
//  index.ts
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/29/20
//  Copyright 2020 Wess Cope
//

import {
  FileSystem,
  Env
} from '../../system'

import {
  Axis,
  Direction,
  Position,
  Command
} from '../command'

import MacroProvider from '../../components/macros/provider'

const {fs, path} = FileSystem

import Tokens from './tokens'

export default class {
  macroProvider = MacroProvider
  
  
  get content():string {
    return this.macroProvider.read(
      this.macroProvider.cleanName(this.filepath)
    )
  }

  get lines():string[] {
    return this.content.split('\n')
  }

  filepath:string

  cosntructor(filepath:string) {
    this.filepath = filepath
  }

  tokenize() {

  }
}
