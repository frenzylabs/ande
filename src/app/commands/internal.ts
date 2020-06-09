//
//  internal.ts
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/20/20
//  Copyright 2020 Wess Cope
//

import MacroProvider  from '../components/macros/provider'
import Command        from './command'

import {
  HumCommand,
  HumCommandHandler
} from './provider'

const store = globalThis.store

const command = (name:string, help:string, handler:HumCommandHandler):HumCommand => {
  return {
    name,
    help,
    handler
  }
}

export default [
  command("probe", "Probe control: /probe <deploy or stow>", (...args) => {
    const opts        = ['deploy', 'stow']
    const opt:string  = `${args[0] || ""}`
    
    if(!opts.includes(opt.toLowerCase())) {
      return `probe option ${opt} is invalid. Available options are ${opts.join(", ")}`
    }

    return Command.probe[opt.toLowerCase()]
  }),

  command("position", "Get current position", (...args) => {
    return Command.position.current
  }),

  command("run", "Runs specified macro: /run <macro name>", (...args) => {
    const provider  = MacroProvider
    const name      = `${args[0] || ""}`.toLowerCase()

    if(name.length < 1) {
      return "macro name is required"
    }

    const macro = provider.loadSync().filter(m => m.title.toLowerCase() == name)[0]

    if(macro == null) {
      return `Unknown macro: ${name}`
    }

    const content = provider.read(macro.file)
    if(content == null) {
      return `Unable to read macro: ${name}`
    }

    return content.split('\n')
      .map(line => line.trim())
      .join('&&')
  })
]
