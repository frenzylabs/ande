//
//  run.ts
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/22/20
//  Copyright 2020 Wess Cope
//

import Menu from './option'

const fans = Menu.Option("Fans", {
  submenu: [
    Menu.Option("On"),
    Menu.Option("Off")
  ]
})

const motors = Menu.Option("Motors", {
  submenu: [
    Menu.Option("On"),
    Menu.Option("Off")
  ]
})

export default (macros) => {
  const macroItems = macros.map(m => Menu.Option(m.title, {data: m}))

  const options = [
    Menu.Option(
      "Run", {
        submenu:     [
          Menu.Option("Firmware info", {shortcut: "Control+i"}),
          Menu.Seperator,
          Menu.Option("Current Position", {shortcut: "Control+p"}),
          Menu.Option("Current Temp.", {shortcut: "Control+t"}),
          Menu.Seperator,
          Menu.Option("Home All", {shortcut: "Control+Shift+H"}),
          Menu.Seperator,
          fans,
          motors,
          Menu.Seperator,
          Menu.Option("Macros", {submenu: macroItems})
        ]
      }
    )
  ]

  return options
}
