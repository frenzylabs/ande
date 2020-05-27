//
//  index.ts
//  Signal
// 
//  Created by Wess Cope (me@wess.io) on 05/22/20
//  Copyright 2020 Wess Cope
//

const uuid = window.require('uuid')

export type SignalHandler     = (event, ...args) => void
export type SignalIdentifier  = string
export type SignalEvent       = string
export type SignalRecord      = Record<SignalEvent, SignalNode[]>

export interface SignalNode {
  id:SignalIdentifier
  handler:SignalHandler
}

export class Signal {
  private registry:SignalRecord  = {}

  get events():SignalEvent[] {
    return Object.keys(this.registry)
  }

  constructor() {
    this.subscribe    = this.subscribe.bind(this)
    this.unsubscribe  = this.unsubscribe.bind(this)
  }

  find(event:SignalEvent):SignalEvent[] {
    if(event.includes('*')) {
      const prefix  = event.replace('*', '')
      var results = []

      this.events.forEach(evt => {
        if(evt.startsWith(prefix)) {
          results.push(evt)
        }
      })

      return results
    }

    return [event]
  }

  subscribe(event:SignalEvent, handler:SignalHandler): SignalIdentifier {
    const id:SignalIdentifier = uuid.v4()

    const eventRegistry = this.registry[event] || []
    
    this.registry[event] = [...new Set(eventRegistry.concat([{id, handler}]))]

    return id
  }

  unsubscribe(identifier:SignalIdentifier)
  unsubscribe(identifier:SignalIdentifier, event?:SignalEvent) {
    const events = event ? this.events.filter(e => e == event) : this.events

    events.forEach(event => {
      this.registry[event] = this.registry[event].filter(node => node.id != identifier)
    })
  }

  emit(event:SignalEvent, data:[] = []) {
    console.log("EMIT: ", event)

    const eventRegistry = [...new Set(this.registry[event] || [] )]

    eventRegistry.forEach(node => node.handler(event, ...data))
  }
}

if(!globalThis.Signal) {
  globalThis.Signal = new Signal()
}

export default globalThis.Signal
