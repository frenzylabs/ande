//
// index
// ande
// 
// Author:  Wess (me@wess.io)
// Created: 24/09/2020
// 
// Copyright (c) 2020 Wess.io
//

import React      from 'react'
import {connect}  from 'react-redux'
import Component  from '../../types/component'

import {
  Layout,
  Row,
  Col,
  Typography,
  Tabs,
  Empty,
  Button
} from 'antd'


const {Text} = Typography

import Data         from './data'
import {OctoServer} from './model'

import Modal    from './modal'
import API      from './api'

import Octologo from '../../images/octoprint.png'

class Octoprint extends Component {
  state = {
    showingNew: false,
    loading:    false,
    data:       [],
    active:     0
  }

  api:API

  constructor(props:any) {
    super(props)

    if(this.props.api) {
      this.api = this.props.api
    }

    this.addHandler     = this.addHandler.bind(this)
    this.saveHandler    = this.saveHandler.bind(this)
    this.closeHandler   = this.closeHandler.bind(this)
    this.removeHandler  = this.removeHandler.bind(this)
    this.editHandler    = this.editHandler.bind(this)
    this.renderPane     = this.renderPane.bind(this)
    this.renderEmpty    = this.renderEmpty.bind(this)
    this.renderTabs     = this.renderTabs.bind(this)
    this.renderContent  = this.renderContent.bind(this)
  }

  addHandler() {
    this.setState({
      ...this.state,
      showingNew: true
    })
  }

  saveHandler(data) {
    Data.add(data)
  }

  closeHandler(e) {
    this.setState({
      ...this.state,
      showingNew: false,
      data: Data.getServers()
    })
  }

  removeHandler(target) {
    const server = this.state.data[target]

    if(!server) return

    Data.remove(server)
    Data.select(0)

    this.setState({
      data: Data.getServers(),
      active: Data.selected()
    })
  }

  editHandler(target, action) {
    switch(action) {
      case 'remove':
        this.removeHandler(target)
        break
      case 'add':
        this.addHandler()
        break
      default:
        return
    }
  }

  componentDidMount() {
    const data    = Data.getServers()
    const active  = Data.selected()

    this.setState({
      data,
      active: active > (data.length - 1) ? 0 : active
    })
  }

  renderPane(data:OctoServer, key:number) {
    return (
      <Tabs.TabPane 
        tab={data.name} 
        key={key} 
        closable={true} 

        style={{
          position: 'absolute',
          padding:  0,
          margin:   0,
          top: '40px',
          right: 0,
          bottom: 0,
          left: 0
        }}>
        <webview 
          src={`http://${data.location || data['address']}`}
          style={{
            margin:   0,
            padding:  0,
            width:    '100%',
            height:   '100%',
          }}
        >
        </webview>
      </Tabs.TabPane>
    )
  }

  renderEmpty() {
    return (
      <Row align="middle" justify="center" style={{height: '100%'}}>
        <Col>
          <Empty
            image={Octologo}
            description={
              <span>
                You have no Octoprint servers connected.
              </span>
            }
          >
            <Button 
              type="primary"
              onClick={this.addHandler}
            >
              Add One Now
            </Button>
          </Empty>
        </Col>
      </Row>
    )
  }

  renderTabs() {
    return (
      <Tabs
        type="editable-card"
        activeKey={`${this.state.active}`}
        onChange={(active) => this.setState({active}, () => Data.select(active))}
        onEdit={this.editHandler}
        style={{
          position: 'relative',
          height:   '100%',
          padding: 0
        }}
      >
        {this.state.data.map(this.renderPane)}
      </Tabs>
    )
  }

  renderContent() {
    return this.state.data.length > 0 
    ? this.renderTabs()
    : this.renderEmpty()
  }

  render() {
    return (
      <>
        <Layout>
          <Row style={{height: '100%'}}>
            <Col flex={1} style={{background: 'rgba(255, 255, 255, 1)', height: '100%'}}>
              {this.renderContent()}
            </Col>
          </Row>   
        </Layout>

        <Modal
          visible={this.state.showingNew}
          saveAction={this.saveHandler}
          closeAction={this.closeHandler}
        />
      </>
    )
  }
}

export default connect()(Octoprint)