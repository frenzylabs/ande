//
//  settings.tsx
//  matter
// 
//  Created by Wess Cope (me@wess.io) on 04/30/20
//  Copyright 2020 Wess Cope
//

import React from 'react'

import {
  Menu,
  Checkbox
} from 'antd'

export default class extends React.Component<any> {
  autoScroll() {
    return (
      <Menu.Item>
        <Checkbox>Auto scroll</Checkbox>
      </Menu.Item>
    )
  }

  render() {
    return (
      <Menu selectable={false}>
        {this.autoScroll()}
      </Menu>
    )
  }
}
