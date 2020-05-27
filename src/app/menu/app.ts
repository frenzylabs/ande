//
//  app.ts
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/22/20
//  Copyright 2020 Wess Cope
//

const {app}         = window.require('electron').remote
const {appMenu, is} = window.require('electron').remote.require('electron-util')

import MacMenu from './mac'

export default is.macos ? MacMenu : []
