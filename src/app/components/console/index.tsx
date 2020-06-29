//
//  index.tsx
//  ande
// 
//  Created by Wess Cope (wess@frenzylabs.com) on 06/29/20
//  Copyright 2020 Frenzy Labs, LLC
//

import React      from 'react'
import {connect}  from 'react-redux'
import Component  from '../../types/component'

import {
  Icon,
  IconComponent
} from '../../icon'

import Buffer from './buffer'

export class Console extends Component {
  state = {
    expanded: true
  }

  render() {
    return (
      <div id="console">
        <div id="console-bar">
          <div>
            Console
          </div>

          <div>
            <button onClick={() => this.setState({expanded: !this.state.expanded}, () => window.dispatchEvent(new Event('resize')))}>
              <IconComponent icon={this.state.expanded ? Icon.windowClose : Icon.browser} />
            </button>
          </div>
        </div>

        <div id="console-buffer" style={{height: this.state.expanded ? '300px' : '0'}}>
          <Buffer buffer={this.props.buffer} defaultMessage="Not connected."/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    buffer: state.connection.buffer
  }
}

export default connect(mapStateToProps)(Console)
