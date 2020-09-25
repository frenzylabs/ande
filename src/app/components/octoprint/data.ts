//
// octoprint
// ande
// 
// Author:  Wess (me@wess.io)
// Created: 24/09/2020
// 
// Copyright (c) 2020 Wess.io
//

const Store = window.require("electron-store")

import {OctoServer} from './model'

export type OctoType = any | null

export class OctoData {
  store = new Store({name: '.octoprints'})

  constructor() {
    this.select     = this.select.bind(this)
    this.selected   = this.selected.bind(this)
    this.getServers = this.getServers.bind(this)
    this.remove     = this.remove.bind(this)
    this.get        = this.get.bind(this)
    this.set        = this.set.bind(this)
    this.add        = this.add.bind(this)
    this.has        = this.has.bind(this)
    this.delete     = this.delete.bind(this)
    this.clear      = this.clear.bind(this)
    this.onChange   = this.onChange.bind(this)
  }

  /// Octo Specific
  select(tab) {
    this.set("octo.selected", tab)
  }

  selected():number {
    return this.get("octo.selected", 0)
  }

  getServers():[OctoServer] {
    return this.get("servers") as [OctoServer]
  }

  remove(server:OctoServer) {
    const servers = this.getServers().filter(s => {
      if(s.name == server.name && s.location == server.location) {
        return false
      }

      return true
    })

    this.delete("servers")

    this.set(
      "servers", 
      servers
    )
  }

  /// Defaults
  get(key:string, fallback:OctoType = null):OctoType {
    return this.store.get(key, fallback)
  }

  set(key:string, value:any) {
    this.store.set(key, value)
  }

  add(server:OctoServer) {
    var servers:[OctoServer] = this.get("servers", [])

    this.delete("servers")

    this.set("servers", servers.concat([server]))
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

if(!globalThis.OctoData) {
  globalThis.OctoData = new OctoData()
}

export default globalThis.OctoData
