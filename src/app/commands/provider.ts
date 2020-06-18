//
//  actions.ts
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/07/20
//  Copyright 2020 Wess Cope
//


import Action           from '../store/action/connection'
import InternalCommands from './internal'

export enum CommandType {
  internal,
  printer,
  passive
}

export type HumCommandHandlerReturn = null | string | number
export type HumCommandHandler       = (...args) => HumCommandHandlerReturn

export interface HumCommand {
  name:string
  help?:string
  handler:HumCommandHandler
}

export default class Provider {
  dispatch = globalThis.ReduxDispatch
  
  prefix = {
    printer:  ["M", "G", "T"],
    internal: ["/"],
    passive: ["&&"]
  }

  commands:Array<HumCommand> = InternalCommands

  constructor() {
    this.register = this.register.bind(this)
    this.getType  = this.getType.bind(this)
    this.parse    = this.parse.bind(this)
    this.send     = this.send.bind(this)
    this.write    = this.write.bind(this)
    this.call     = this.call.bind(this)
  }

  register(cmd:HumCommand) {
    var commands = this.commands.filter(c => c.name != cmd.name)
    commands.push(cmd)

    this.commands = commands
  }

  fetch(name:string):HumCommand | null {
    const result = this.commands.filter(cmd => cmd.name == name)

    return this.commands.filter(cmd => cmd.name == name)[0] || null
  }

  getType(str:string):CommandType | null {
    const first = str.substr(0, 1)
    
    if(this.prefix.printer.includes(first)) {
      return CommandType.printer
    }

    if(this.prefix.internal.includes(first)) {
      return CommandType.internal
    }

    return null
  }

  parse(str:string):{[key:string]: any} {
    const indicator       = str.substr(0, 1)
    const [name, ...args]  = str.replace(indicator, '').split(' ')

    return {
      name,
      args
    }
  }

  send(cmd:string) {
    switch(this.getType(cmd)) {
      case CommandType.printer:
        this.write(cmd)
        break
      case CommandType.internal:
        this.call(cmd)
        break
      case CommandType.passive:
        break
      default:
        this.dispatch(
          Action.received(`[Error]: Invalid command: ${cmd}`)
        )

        break
    }
  }
  
  write(cmd:string) {
    this.dispatch(
      Action.send(cmd)
    )

    this.dispatch(
      Action.received(cmd)
    )
  }

  call(cmd:string) {
    const {name, args}  = this.parse(cmd)
    const command       = this.fetch(name)

    if(name == 'help') {
      this.showHelp(args)

      return
    }

    if(command == null) {
      this.dispatch(
        Action.received(`[Error]: Unknown command: ${cmd}`)
      )
      return
    }

    if(args[0] == 'help') {
      this.dispatch(
        Action.received(command.help || `No help provided for ${name}`)
      )
      return
    }

    const res = command.handler(args)

    if(res == null) {
      return
    }

    const resCmd = res.toString()

    if(this.getType(resCmd) == CommandType.printer) {
      if(resCmd.includes('&&')) {
        resCmd.split('&&')
          .filter(c => c.length > 0)
          .map(c => c.trim())
          .forEach(this.write)

        return
      }

      this.write(resCmd)
      
      return
    }

    this.dispatch(
      Action.received(`${res}`)
    )
  }

  showHelp(...args) {
    ['\t Hum commands:'].concat(
      this.commands.map(cmd => {
        return [
          '\t\t -',
          cmd.name, ': ',
          cmd.help || 'No help provided'
        ].join(' ')
      })
    ).forEach(line => 
      this.dispatch(
        Action.received(line)
      )
    )

  }
}
