//
//  index.tsx
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/06/20
//  Copyright 2020 Wess Cope
//

import React      from 'react'
import {connect}  from 'react-redux'
import Component  from '../../types/component'

import {
  Input,
  Radio,
  Button
} from "antd"

import { 
  CaretUpFilled,
  CaretDownFilled
} from '@ant-design/icons';

import Icon, {IconComponent} from '../../icon'

import {
  Command, 
  Direction
} from '../../commands/command'

class Controls extends Component {
  state = {
    scale: 1
  }

  action(cmd:Direction) {

  }

  zAction(cmd:Direction) {

  }

  renderControl(cmd:Direction, isZ:boolean = false) {
    let icon:Icon

    switch(cmd) {
      case Direction.FORWARD:
      case Direction.UP:
        icon = Icon.up
        break
      case Direction.RIGHT:
        icon = Icon.right
        break
      case Direction.BACK:
      case Direction.DOWN:
        icon = Icon.down
        break
      case Direction.LEFT:
        icon = Icon.left
        break
      case Direction.HOME:
        icon = Icon.home
        break
    }

    return (
      <button onClick={() => isZ ? this.zAction(cmd) : this.action(cmd)}>
        <IconComponent 
          icon={icon}
          style={{fontSize: cmd == Direction.HOME ? '32px': '46px'}}
        />
      </button>
    )
  }

  renderDirectional() {
    return (
      <div id="directional">
        <div className="controls-title">X/Y Offset</div>
        <div className="control-row">
          <div className="control">
            {this.renderControl(Direction.FORWARD)}
          </div>
        </div>

        <div className="control-row middle-row">
          <div className="control">
            {this.renderControl(Direction.LEFT)}
          </div>

          <div className="control">
            {this.renderControl(Direction.HOME)}
          </div>

          <div className="control">
            {this.renderControl(Direction.RIGHT)}
          </div>
        </div>

        <div className="control-row">
          <div className="control">
            {this.renderControl(Direction.BACK)}
          </div>
        </div>

      </div>
    )
  }

  renderZ() {
    return (
      <div id="z">
        <div className="controls-title">Z Offset</div>

        <div className="control">
          {this.renderControl(Direction.UP, true)}
        </div>

        <div className="control">
          {this.renderControl(Direction.HOME, true)}
        </div>

        <div className="control">
          {this.renderControl(Direction.DOWN, true)}
        </div>
      </div>
    )
  }

  renderScale() {
    return (
      <div id="scale-row">
        <Radio.Group 
          size="large" 
          value={this.state.scale} 
          buttonStyle="solid"
          onChange={(e) => this.setState({scale: e.target.value})}
        >
          <Radio.Button value={0.1}>0.1</Radio.Button>
          <Radio.Button value={1}>1</Radio.Button>
          <Radio.Button value={10}>10</Radio.Button>
          <Radio.Button value={100}>100</Radio.Button>
        </Radio.Group>
      </div>
    )
  }

  renderHotend() {
    return (
      <div className="temp-row">
        <div className="temp-col temp-label">
          <h4>Hotend:</h4>
          <p>------&deg;</p>
        </div>

        <div className="temp-col">
          <div className="temp-input">
            <Input style={{border: 'none'}} />

            <div className="temp-steps">
              <a><IconComponent icon={Icon.up} className="step-dir"/></a>
              <a><IconComponent icon={Icon.down} className="step-dir"/></a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderBed() {
    return (
      <div className="temp-row">
        <div className="temp-col temp-label">
          <h4>Bed:</h4>
          <p>------&deg;</p>
        </div>

        <div className="temp-col">
          <div className="temp-input">
            <Input style={{border: 'none'}} />

            <div className="temp-steps">
              <a><IconComponent icon={Icon.up} className="step-dir"/></a>
              <a><IconComponent icon={Icon.down} className="step-dir"/></a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div id="controls">
        <div id="dim-move">
          {this.renderDirectional()}
          
          <div className="divider"></div>
          
          {this.renderZ()}
        </div>

        {this.renderScale()}

        <div className="horizontal-divide"/>

        <div id="temps">
          {this.renderHotend()}

          {this.renderBed()}
        </div>

        <div className="horizontal-divide"/>

        <div className="part-controls">
          <div className="part-label">Fan:</div>
          <div className="part-control">
            <Button>On</Button>
            <Button>Off</Button>
          </div>
        </div>

        <div className="part-controls">
          <div className="part-label">Motors:</div>
          <div className="part-control">
            <Button>On</Button>
            <Button>Off</Button>
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.connection.status
  }
}

export default connect(mapStateToProps)(Controls)
