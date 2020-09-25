//
// toolbar
// ande
// 
// Author:  Wess (me@wess.io)
// Created: 24/09/2020
// 
// Copyright (c) 2020 Wess.io
//

import React from 'react'

import {
  Layout,
  Row,
  Col,
  Button
} from 'antd'

import {Icon, IconComponent} from '../../icon'

interface Props {
  addHandler:Function
}
export default class extends React.Component<Props> {
  render() {
    return (
      <Layout style={{background: 'rgba(0, 0, 0, 0.02)', padding: '4px 8px', borderBottom: "1px solid rgba(0, 0, 0, 0.08)"}}>
        <Row>
          <Col flex={1}>Octopi Connections</Col>
          <Col>
            <Button type="text" size="small" onClick={(e) => this.props.addHandler(e)}>
              <IconComponent icon={Icon.filePlus}/>
            </Button>
          </Col>
        </Row>
      </Layout>
    )
  }
}