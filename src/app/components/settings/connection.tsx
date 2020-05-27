//
//  connection.tsx
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/27/20
//  Copyright 2020 Wess Cope
//

import React      from 'react'
import {connect}  from 'react-redux'
import Component  from '../../types/component'

import { Checkbox } from 'antd'

class ConnectionSettings extends Component {
  render() {
    return (
      <div className="settings-pane">
        <h2>Connection</h2>

        <div className="settings-field">
          <h3>Auto connect</h3>
          <Checkbox>
            Connect to port on start up, if available.
          </Checkbox>
        </div>
      </div>
    )
  }
}

export default connect()(ConnectionSettings)
