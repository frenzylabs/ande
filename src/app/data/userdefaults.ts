//
//  userdefaults.ts
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/21/20
//  Copyright 2020 Wess Cope
//

const Store = window.require("electron-store")

export type UserDefaultValueType = any | null

export class UserDefaults {
  store = new Store({name: '.userdefaults'})

  constructor() {
    this.get      = this.get.bind(this)
    this.set      = this.set.bind(this)
    this.has      = this.has.bind(this)
    this.delete   = this.delete.bind(this)
    this.clear    = this.clear.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  get(key:string, fallback:UserDefaultValueType = null):UserDefaultValueType {
    return this.store.get(key, fallback)
  }

  set(key:string, value:any) {
    this.store.set(key, value)
  }

  has(key:string) {
    return this.store.has(key)
  }

  delete(key:string) {
    this.store.delete(key)
  }

  clear() {
    this.store.clear()
  }

  onChange(key:string, handler:(newValue:any, oldValue:any) => void) {
    return this.store.onDidChange(key, handler)
  }
}

if(!globalThis.UserDefaults) {
  globalThis.UserDefaults = new UserDefaults()
}

export default globalThis.UserDefaults
