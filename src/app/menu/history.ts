//
//  history.ts
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/22/20
//  Copyright 2020 Wess Cope
//

import Menu from './option'

export default [
  Menu.Option(
    "History", {
      submenu: [
        Menu.Option("Clear Command History"),
        Menu.Option("Clear Buffer History")
      ]  
    }
  )
]
