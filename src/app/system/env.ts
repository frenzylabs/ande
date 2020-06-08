//
//  system.ts
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/11/20
//  Copyright 2020 Wess Cope
//

const remote  = window.require('electron').remote
const app     = remote.app
const path    = remote.require('path')

const dataPath = app.getPath('userData')

export default {
  version: app.getVersion(),
  directory: {
    user: dataPath,
    macros: path.join(dataPath, 'macros')
  }
}
