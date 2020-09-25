//
// modal
// ande
// 
// Author:  Wess (me@wess.io)
// Created: 24/09/2020
// 
// Copyright (c) 2020 Wess.io
//

import React  from 'react'

import {
  dnssd,
  net
} from '../../system'

import {
  Layout,
  Row,
  Col,
  AutoComplete,
  Modal,
  Form,
  Input,
  Divider,
  Alert,
  Button
} from 'antd'

import Api          from './api'
import {OctoServer} from './model'

interface Props {
  visible:      boolean
  saveAction:   Function
  closeAction:  Function
}

export default class extends React.Component<Props> {
  browser = dnssd.Browser(dnssd.tcp('octoprint'))
    // .on('serviceUp', service => 
    //   this.setState({...this.state,
    //     services: this.state.services.concat([service.host])
    //   })
    // )
    .start()

  state = {
    requestingToken: false,
    error: null,
    services:     this.browser.list().map(e => e.host),
    newConnection: {
      location: "",
      name:     "",
      token:    ""
    }
  }

  list() { 
    return this.state.services.reduce((acc, service) => {
      var label = service.substring(service.length - 1) == '.' ? service.substring(0, service.length - 1) : service

      return acc.concat([{label, value: label}])
    }, [])
  }

  requestToken() {
    this.setState({...this.state, requestingToken: true}, () => {
      const api = new Api(this.state.newConnection as OctoServer)

      api.token((err, res) => {
        if(err) {
          this.setState({
            ...this.state, 
            error: err.message,
            requestingToken: false,
          })
          return
        }

        this.setState({
          ...this.state, 
          requestingToken: false,
          newConnection: {
            ...this.state.newConnection,
            token: res.data['app_token']
          }
        })
      })  
    })
  }

  saveConnection() {

    const address = this.state.newConnection.location
    const name    = this.state.newConnection.name || address
    
    if(!address) { 
      this.setState({
        ...this.state,
        error: 'An IP or host is required for Location'
      })
      return 
    }

    const conn = {
      name:     name,
      address:  address,
      token:    this.state.newConnection.token  
    }

    this.props.saveAction(conn)
    
    this.setState({
      connections: [],
      services: this.browser.list().map(e => e.host),
      newConnection: {
        location: "",
        name:     "",
        token:    "" 
      }
    })

    this.props.closeAction()
  }

  componentDidMount() {
    this.browser.stop(true)
    this.browser.start()
  }

  renderNameField() {
    return (
      <AutoComplete
        allowClear
        size="large"
        placeholder="Location (IP address or host)"
        filterOption={(input, option) => {
          return input == ((option.label || '') as string).toLowerCase().substr(0, input.length)
        }}

        onChange={(value) => this.setState({
          ...this.state,
          newConnection: {
            ...this.state.newConnection,
            location: (value || '').replace('ip.', '')
          }
        })}

        value={this.state.newConnection.location}

        options={this.list()}
      />
    )
  }

  renderForm() {
    return (
      <Form>
        <Form.Item rules={[{ required: true, message: 'Octoprint ip add or url name is required' }]}>
          {this.renderNameField()}
        </Form.Item>

        <Form.Item>
          <Input 
            name="token" 
            size="large" 
            placeholder="Auth token" 
            disabled 
            value={this.state.newConnection.token}
            addonAfter={
              <Button 
                type="text" 
                onClick={_e => this.requestToken()}
                loading={this.state.requestingToken} 
                disabled={this.state.requestingToken}>
                  Request
              </Button>
            }
            />
          
        </Form.Item>

        <Divider>Optional</Divider>

        <Form.Item>
          <Input name="name" size="large" placeholder="Server name"/>
        </Form.Item>
      </Form>
    )
  }

  renderError() {
    if(!this.state.error || this.state.error.length < 1) return

    return (
      <>
        <Row>
          <Col flex={1}>
            <Alert message={this.state.error} type="error" showIcon/>
          </Col>
        </Row>
      
        <br/>
      </>
    )
  }
  render() {
    return (
      <Modal
        title="Add Octoprint Connection"
        visible={this.props.visible}
        okText="Save"
        okButtonProps={{disabled: (this.state.newConnection.location && this.state.newConnection.token)? false : true}}
        onOk={(e) => this.saveConnection()}
        onCancel={(e) => this.props.closeAction(e)}
      >
        <Layout style={{background: 'transparent', width: '100%'}}>
          {this.renderError()}

          <Row align="top">
            <Col flex={1}>{this.renderForm()}</Col>
          </Row>
        </Layout>
      </Modal>
    )
  }
}