//
//  file.tsx
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/11/20
//  Copyright 2020 Wess Cope
//

const remote  = window.require('electron').remote
const path    = remote.require('path')
const fs      = remote.require('fs-extra')

export interface FileObject {
  type: 'directory' | 'file',
  path:string
  children:Array<string>
}

export default {
  fs, path
}
