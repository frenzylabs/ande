//
//  index.tsx
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/19/20
//  Copyright 2020 Wess Cope
//

import React      from 'react'
import {connect}  from 'react-redux'
import Component  from '../../types/component'
import Action     from '../../store/action/connection'
import DataAction from '../../store/action/data'

import {ConnectionStatus} from '../../connection'
import {Provider}         from '../../commands'

import { 
  Input as AntInput,
} from 'antd'

class CommandInput extends Component {
  provider = new Provider()

  state = {
    disabled: false,
    command:  ""
  }

  private commandIndex:number = -1

  constructor(props:any) {
    super(props)

    this.keyAction      = this.keyAction.bind(this)
    this.up             = this.up.bind(this)
    this.down           = this.down.bind(this)
    this.enter          = this.enter.bind(this)
    this.commandChange  = this.commandChange.bind(this)
  }

  keyAction(e) {
    switch(e.keyCode) {
      case 13:
        this.enter()
        return
      case 38:
        this.up()
        return
      case 40:
        this.down()
        return
      default:
        return
    }
  }

  up() {
    if(this.commandIndex >= (this.props.history.length - 1)) { return }

    this.commandIndex += 1

    let line = this.props.history[this.commandIndex]


    this.setState({
      command: line
    })
  }

  down() {
    if(this.commandIndex == -1) {
      if(this.state.command.length < 1) { return }

      this.setState({
        command: ""
      })

      return 
    }

    this.commandIndex -= 1

    this.setState({
      command: this.props.history[this.commandIndex]
    })
  }

  enter() {
    if(this.state.command.length < 1) { return }

    const command = this.state.command

    var commands = (this.props.history || [])
    commands.unshift(command)

    this.setState({
      command: ""
    })

    this.dispatch(
      DataAction.historyAdd(command)
    )

    this.commandIndex = -1

    let sequence = (command.includes('&&') ? command.split('&&') : [command])
    sequence.forEach(this.provider.send)
  }


  commandChange(e) {
    if(this.props.commandChanged) {
      this.props.commandChanged(e.target.value)
    }

    this.setState({
      ...this.state,
      command: e.target.value
    })

    if(this.state.command.length > 0) {
      e.target.setSelectionRange(this.state.command.length + 1, this.state.command.length + 1)
    }
  }

  render() {
    return (
      <div className="command-input">
        <AntInput 
          disabled={this.state.disabled}
          className="command-field" 
          placeholder="Enter command..." 
          value={this.state.command}
          onChange={this.commandChange}
          onKeyUp={this.keyAction}
        />
      </div>
    )
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      disabled: nextProps.hasOwnProperty('disabled') 
                ? nextProps.disabled 
                : nextProps.hasOwnProperty('status') 
                  ? nextProps.status != ConnectionStatus.connected 
                  : prevState.disabled
    }
  }

}

const mapStateToProps = (state) => {
  return {
    status: state.connection.status || ConnectionStatus.disconnected,
    history: state.data.commandHistory
  }
}

export default connect(mapStateToProps)(CommandInput)
