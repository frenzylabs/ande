//
//  system.ts
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/11/20
//  Copyright 2020 Wess Cope
//

const remote    = window.require('electron').remote
const app       = remote.app
const path      = remote.require('path')
const dataPath  = app.getPath('userData')
const marlin    = path.join(dataPath, 'marlin')

export default {
  version: app.getVersion(),
  directory: {
    user:   dataPath,
    macros: path.join(dataPath, 'macros'),
    am:     path.join(dataPath, 'ancilla_macros'),
    marlin: {
      root:     marlin,
      temp:     path.join(marlin, 'temp'),
      versions: path.join(marlin, 'versions'),
    },
    configs: path.join(dataPath, 'configs')
  }
}
