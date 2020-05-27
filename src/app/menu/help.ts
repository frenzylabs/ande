//
//  help.ts
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/22/20
//  Copyright 2020 Wess Cope
//

import Menu from './option'

export default [
  Menu.Role(
    Menu.Roles.help,
    [
      Menu.Option("Welcome"),
      Menu.Option("Documentation"),
      Menu.Option("Release Notes"),
      Menu.Seperator,
      Menu.Option("Report Issue"),
      Menu.Option("Feature Request"),
      Menu.Option("View License"),
      Menu.Seperator,
      Menu.Option("FrenzyLabs", {
        submenu: [
          Menu.Option("FrenzyLabs.com"),
          Menu.Option("LayerKeep.com"),
          Menu.Option("Pluck.io"),
          Menu.Option("Ancilla.app"),
        ]
      })
    ]
  )
]
