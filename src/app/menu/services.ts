//
//  services.ts
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/27/20
//  Copyright 2020 Wess Cope
//

import Menu from './option'

export default [
  Menu.Option("Services", {
    submenu: [
      Menu.Option("LayerKeep.com"),
      Menu.Option("Pluck.io"),
      Menu.Option("Ancilla.app"),
    ]
  })
]
