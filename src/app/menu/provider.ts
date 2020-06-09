//
//  provider.ts
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/25/20
//  Copyright 2020 Wess Cope
//

import React        from 'react'
import {withRouter} from 'react-router'
import {connect}    from 'react-redux'
import Component    from '../types/component'
import Action       from '../store/action'
import Command      from '../commands/command'

class MenuProvider extends Component {
  subscriptions:string[] = [
  ]

  constructor(props:any) {
    super(props)


    this.macroAction    = this.macroAction.bind(this)
    this.defaultAction  = this.defaultAction.bind(this)
    this.dispatchEvent  = this.dispatchEvent.bind(this)
    this.setupEvents    = this.setupEvents.bind(this)
  }


  macroAction(macro) {
    if(!this.props.runMacro) {
      return
    }

    this.props.runMacro(macro)
  }

  defaultAction(e) {
    
    if(e.includes('macros')) {
      const [_menu, _macros, name] = e.split('.')

      return this.macroAction(name)
    }
  }

  dispatchEvent(e) {
    var action = null

    switch(e) {
      case 'menu.connection.refresh-ports':
        action = Action.connection.clearPorts()
        break
      case 'menu.connection.connect':
        action = Action.connection.connect(this.props.connection.port, this.props.connection.baudrate)
        break 
      case 'menu.connection.disconnect':
        action = Action.connection.disconnect()
        break 
      case 'menu.history.clear-command-history':
        action = Action.data.historyClear()
        break 
      case 'menu.history.clear-buffer-history':
        action = Action.connection.clear()
        break 
      case 'menu.run.firmware-info':
        action = Action.connection.send(Command.firmware.info)
        break
      case 'menu.run.home-all':
        action = Action.connection.send(Command.move.home())
        break
      case 'menu.run.current-temp':
        action = Action.connection.send(Command.temp.current)
        break
      case 'menu.run.current-position':
        action = Action.connection.send(Command.position.current)
        break
      case 'menu.fans.on':
        action = Action.connection.send(Command.fans(true))
        break
      case 'menu.fans.off':
        action = Action.connection.send(Command.fans(false))
        break
      case 'menu.motors.on':
        action = Action.connection.send(Command.motors(true))
        break
      case 'menu.motors.off':
        action = Action.connection.send(Command.motors(false))
        break
    
      default:
        break 
    }

    if(!action) { 
      this.defaultAction(e)

      return
     }

    this.dispatch(
      action
    )
  }

  setupEvents() {
    const propEvents:string[] = [...new Set(this.props.events)] as string[]
    const subEvents           = propEvents.filter(e => !this.subscriptions.includes(e))

    subEvents.forEach(event => {
      const id = this.signal.subscribe(event, this.dispatchEvent)

      this.subscriptions = [...new Set(this.subscriptions.concat([event as string]))]
    })


  }

  componentDidMount() {
    this.setupEvents()
  }

  componentDidUpdate() {
    this.setupEvents()
  }

  render() { 
    return this.props.children 
  }
}

const MapStateToProps = state => state

export default withRouter(connect(MapStateToProps)(MenuProvider))
