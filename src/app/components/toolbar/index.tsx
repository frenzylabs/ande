//
//  index.tsx
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/01/20
//  Copyright 2020 Wess Cope
//

import React      from 'react'
import {connect}  from 'react-redux'

import Component  from '../../types/component'
import Action     from '../../store/action/connection'

import {
  Button,
  Row,
  Col
} from 'antd'

import Icon, {IconComponent} from '../../icon'

import Ports    from './ports'
import Baudrate from './baudrate'

import {ConnectionStatus} from '../../connection'

class Toolbar extends Component {
  get color():string {

    return this.props.connection.status == ConnectionStatus.disconnected 
      ? '#e51c23' 
      : '#259b24'
  }

  constructor(props:any) {
    super(props)

    this.powerHandler = this.powerHandler.bind(this)
  }

  powerHandler() {
    switch(this.props.connection.status) {
      case ConnectionStatus.disconnected:
        this.dispatch(
          Action.connect(
            this.props.connection.port,
            this.props.connection.baudrate
          )
        )

        return

      case ConnectionStatus.connected:
        this.dispatch(
          Action.disconnect()
        )
        
        return

      default:
        return
    }
  }

  renderControlToggle() {
    return (
      <Col>
        <Button 
          disabled={!(this.props.connection.status == ConnectionStatus.connected)}
          type="link"
        >
          <IconComponent 
            icon={Icon.asterisk} 
            className="bar-button"
            style={{
              marginTop: '1px',
              fontSize: '20px',
              color: this.props.controls ? "#536dfe" : this.props.connection.status == ConnectionStatus.connected ? "#40c4ff" : "rgba(0,0,0,0.5)", 
            }}/>
        </Button>
      </Col>
    )
  }

  render() {
    return (
      <nav id="toolbar">
        <div className="panel">
          <h1>Hum <span>0.0.1</span></h1>
        </div>

        <div className="flex-space"/>

        <div className="panel">
          <Row gutter={8} align="middle">
            <Col><IconComponent icon={Icon.circle} style={{color: this.color, marginTop: '6px',  marginRight: '10px'}}/></Col>
            <Col><Ports/></Col>
            <Col><Baudrate/></Col>
            <Col>
              <Button 
                type="link"
                onClick={this.powerHandler}
              >
                <IconComponent 
                  icon={Icon.power} 
                  className="bar-button"
                  style={{
                    marginTop: '1px',
                    fontSize: '20px',
                    color: this.color, 
                  }}/>
              </Button>
            </Col>
          </Row>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    connection: state.connection,
    controls: state.controls
  }
}

export default connect(mapStateToProps)(Toolbar)
