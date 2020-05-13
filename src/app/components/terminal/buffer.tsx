//
//  buffer.tsx
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/06/20
//  Copyright 2020 Wess Cope
//

import React      from 'react'
import Component  from '../../types/component'

import { 
  List,
} from 'antd'

export default class extends Component {
  renderItem(item) {
    return (
      <List.Item className="buffer-item">{item}</List.Item>
    )
  }

  render() {
    return (
      <div id="buffer">
        <List
          size="small"
          split={false}
          dataSource={this.props.dataSource || []}
          renderItem={this.renderItem}
        />
      </div>

    )
  }
}
