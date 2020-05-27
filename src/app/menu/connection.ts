//
//  connection.ts
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/22/20
//  Copyright 2020 Wess Cope
//

import Menu from './option'

export default (connectionState) => {
  return [
    Menu.Option(
      "Connection", {
        submenu: [
          Menu.Option("Refresh ports", {shortcut: "Control+Shift+P"}),
          Menu.Seperator,
          Menu.Option("Connect", {shortcut: "Control+Shift+C"}),
          Menu.Option("Disconnect", {shortcut: "Control+Shift+D"}),
        ]
      }
    )
  ]
  
}
