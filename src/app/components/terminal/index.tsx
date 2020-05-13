//
//  index.tsx
//  matter
// 
//  Created by Wess Cope (me@wess.io) on 04/30/20
//  Copyright 2020 Wess Cope
//

import React      from 'react'
import {connect}  from 'react-redux'
import Component  from '../../types/component'
import Action     from '../../store/action'

import { 
  Dropdown,
  Button
} from 'antd'

import Icon, {IconComponent}  from '../../icon'
import {ConnectionStatus}     from '../../connection'

import Buffer       from './buffer'
import CommandInput from './command-input'
import Settings     from './settings'
import Controls     from '../controls'

class Terminal extends Component {
  state = {
    entry:    "",
    commands: [],
  }

  private commandIndex = 0

  constructor(props:any) {
    super(props)

    this.keyAction    = this.keyAction.bind(this)
    this.inputChange  = this.inputChange.bind(this)
    this.enter        = this.enter.bind(this)
    this.up           = this.up.bind(this)
    this.down         = this.down.bind(this)
    this.clear        = this.clear.bind(this)
  }

  enter() {
    if(this.state.entry.length < 1) { return }

    const command = this.state.entry

    var commands = (this.state.commands || [])
    commands.unshift(command)

    this.setState({
      commands: commands,
      entry: ""
    })

    this.commandIndex = 0

    const multiCommands = command.includes('&&') ? command.split('&&') : [command]

    multiCommands.forEach(cmd => this.dispatch(Action.send(cmd)))
  }

  up() {
    if(this.commandIndex >= this.state.commands.length) { return }

    let line = this.state.commands[this.commandIndex]

    this.commandIndex += 1

    this.setState({
      entry: line
    })
  }

  down() {
    if(this.commandIndex == -1) {
      this.setState({
        entry: ""
      })

      return 
    }

    this.commandIndex -= 1;

    this.setState({
      entry: this.state.commands[this.commandIndex]
    })
  }

  clear() {
    this.dispatch(
      Action.clear()
    )
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

  inputChange(e) {
    this.setState({entry: e.target.value})
  }

  renderClear() {
    return (
      <Button type="link" style={{color: "rgba(0, 0, 0, 0.6)"}} onClick={this.clear}>
        <IconComponent icon={Icon.trash} style={{fontSize: '18px'}}/>
      </Button>
    )
  }

  renderSettings() {
    return (
      <Dropdown overlay={<Settings/>} placement="topRight" trigger={["click"]} overlayClassName="terminal-settings-menu">
        <Button type="link" style={{color: "rgba(0, 0, 0, 0.6)"}}>
          <IconComponent icon={Icon.cog} style={{fontSize: '18px'}}/>
        </Button>
      </Dropdown>
    )
  }

  render() {
    return (
      <div id="terminal">
        <Buffer dataSource={this.props.buffer || []} />

        <div id="command-line" style={{background: this.props.status == ConnectionStatus.connected ? "#fff" : "#f4f5f4"}}>
          <CommandInput
            disabled={this.props.status != ConnectionStatus.connected}
            entry={this.state.entry}
            inputChange={this.inputChange}
            keyAction={this.keyAction}
          />

          <div className="buffer-input-options">
            {this.renderClear()}
            {this.renderSettings()}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    buffer:   state.buffer,
    controls: state.controls,
    status:   state.connection.status
  }
}

export default connect(mapStateToProps)(Terminal)
