//
//  index.ts
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/13/20
//  Copyright 2020 Wess Cope
//

const Store = window.require("electron-store")

if(!globalThis.data) {
  globalThis.data = new Store({name: '.hstore'})
}

export default globalThis.data
