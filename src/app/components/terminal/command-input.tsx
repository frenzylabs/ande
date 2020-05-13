//
//  commandline.tsx
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/06/20
//  Copyright 2020 Wess Cope
//

import React      from 'react'
import Component  from '../../types/component'

import { 
  Input,
} from 'antd'

export default class CommandInput extends Component {
  render() {
    return (
      <div className="buffer-input">
      <Input 
        disabled={this.props.disabled}
        className="buffer-input-field" 
        placeholder="Enter command..." 
        value={this.props.entry}
        onChange={this.props.inputChange}
        onKeyUp={this.props.keyAction}
      />
    </div>
    )
  }
}
