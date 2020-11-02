//
//  option.tsx
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/11/20
//  Copyright 2020 Wess Cope
//

import React  from 'react'

import {
  NavLink
} from 'react-router-dom'

import {
  Row,
  Col
} from 'antd'

import Icon, {IconComponent} from '../../icon'

interface Props {
  icon:Icon,
  path:string,
  current?:boolean
}

export default class extends React.Component<Props> {

  icon:Icon

  constructor(props:any) {
    super(props)

    this.icon = this.props['icon'] || Icon.cog

    this.renderIcon = this.renderIcon.bind(this)
  }

  renderIcon() {
    return (
      <IconComponent
        icon={this.icon}
        style={{fontSize: '16px'}}
        fixedWidth
      />
    )
  }

  render() {
    return (
      <Row style={{width: '100%'}}>
        <Col flex={1}>
          <NavLink
            className="option"
            activeClassName="current"
            to={this.props.path}
            exact
          >
            {this.renderIcon()}
          </NavLink>
        </Col>
      </Row>
    )
  }
}
