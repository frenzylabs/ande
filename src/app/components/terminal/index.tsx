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
import Action     from '../../store/action/connection'

import { 
  Button
} from 'antd'

import Icon, {IconComponent}  from '../../icon'
import {ConnectionStatus}     from '../../connection'

import Buffer       from '../buffer'
import CommandInput from '../command-input'

class Terminal extends Component {
  constructor(props:any) {
    super(props)

    this.clear = this.clear.bind(this)
  }

  clear() {
    this.dispatch(
      Action.clear()
    )
  }

  renderClear() {
    return (
      <Button type="link" style={{color: "rgba(0, 0, 0, 0.6)"}} onClick={this.clear}>
        <IconComponent icon={Icon.trash} style={{fontSize: '18px'}}/>
      </Button>
    )
  }

  render() {
    return (
      <div id="terminal">
        <Buffer />

        <div id="command-line" style={{background: this.props.status == ConnectionStatus.connected ? "#fff" : "#f4f5f4"}}>
          <CommandInput/>

          <div className="buffer-input-options">
            {this.renderClear()}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    buffer:   state.connection.buffer,
    status:   state.connection.status
  }
}

export default connect(mapStateToProps)(Terminal)
