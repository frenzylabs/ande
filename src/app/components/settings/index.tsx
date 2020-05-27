//
//  index.tsx
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/27/20
//  Copyright 2020 Wess Cope
//

import React      from 'react'
import {connect}  from 'react-redux'
import Component  from '../../types/component'

import {
  withRouter
} from 'react-router-dom'

import {
  Drawer,
} from 'antd'

import Connection from './connection'

class Settings extends Component {
  state = {
    visible: true,
    sections: [
      "Connection"
    ],

    current: "Shortcuts"
  }

  constructor(props:any) {
    super(props)

    this.close          = this.close.bind(this)
    this.renderCurrent  = this.renderCurrent.bind(this)
  }

  close() {
    this.setState({visible: false}, () => this.props.history.goBack())
  }

  renderCurrent() {
    switch(this.state.current) {
      case "Connection":
        return <Connection/>
      default:
        return <></>
    }
    
  }

  render() {
    return (
      <Drawer
        title="Settings"
        placement="right"
        closable={true}
        onClose={this.close}
        visible={this.state.visible}
        width={620}
      >
        <div id="settings">
          <div id="settings-outline">
            <ul>
              {this.state.sections.map((section, index) => 
                <li key={`setting-section-${index}`}>
                  <a
                    onClick={() => this.setState({current: section})}
                    className={this.state.current == section ? "active" : ""}
                  >
                    {section}
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div id="settings-content">
            {this.renderCurrent()}
          </div>
        </div>
      </Drawer>
    )
  }
}

export default withRouter(connect()(Settings))
