//
//  mac.ts
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/22/20
//  Copyright 2020 Wess Cope
//

const {app}     = window.require('electron').remote
const {appMenu} = window.require('electron').remote.require('electron-util')

import Menu from './option'

export default [appMenu([
  // Menu.Option(
  //   "Preferences...",
  //   {shortcut: "Command+,"}
  // ),
  Menu.Option(
    "Check for update...",
  )
])]
