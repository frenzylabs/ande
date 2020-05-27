//
//  editor.ts
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/22/20
//  Copyright 2020 Wess Cope
//

import Menu from './option'

export default [
  Menu.Role(
    Menu.Roles.fileMenu,
    [
      Menu.Option("New Macro", {shortcut: "Command+n"}),
      Menu.Seperator,
      Menu.Option("Save"),
      Menu.Option("Save As..."),
      Menu.Seperator,
      Menu.Option("Import"),
      Menu.Option("Export")
    ]
  ),

  Menu.Role(Menu.Roles.editMenu)
]
