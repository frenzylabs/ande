//
// modal
// ande
// 
// Author:  Wess (me@wess.io)
// Created: 21/10/2020
// 
// Copyright (c) 2020 Wess.io
//

import React from 'react'

import {
  Layout,
  Row,
  Col,
  Modal,
  Form,
  Select,
  Input,
  Alert,
  Button,
  Spin
} from 'antd'

import api from './api'

interface Props {
  saveStatus:   string
  saving:       boolean
  visible:      boolean
  saveAction:   Function
  closeAction:  Function
}

export default class extends React.Component<Props> {
  state = {
    releases: [],
    loading:  true,
    name:     null,
    release:  null,
    error:    null,
  }

  constructor(props) {
    super(props)

    this.closeAction    = this.closeAction.bind(this)
    this.saveAction     = this.saveAction.bind(this)
    this.renderVersions = this.renderVersions.bind(this)
    this.renderName     = this.renderName.bind(this)
    this.renderError    = this.renderError.bind(this)
    this.renderLayout   = this.renderLayout.bind(this)
    this.renderFooter   = this.renderFooter.bind(this)
  }

  closeAction() {
    this.setState({
      releases: [],
      loading:  true,
      name:     null,
      release:  null,
      error:    null
    }, () => this.props.closeAction())
  }

  saveAction() {
    const {name, release} = this.state

    if(name == null && release == null) {
      this.setState({
        ...this.state,
        error: "A name and release are required"
      })

      return
    }

    if(name == null) {
      this.setState({
        ...this.state,
        error: "A name is required"
      })

      return 
    }

    if(release == null) {
      this.setState({
        ...this.state,
        error: "A release is required"
      })

      return 
    }

    this.props.saveAction({
      name,
      release
    })
  }

  componentDidMount() {
    this.setState({loading: true}, () => {
      api.list((err, res) => {
        if(err) {
          console.error(err)
          return
        }
      
        this.setState({
          releases: res,
          loading: false
        })
      })
    })
  }

  renderVersions() {
    const option = (label, value) => {
      return {
        label,
        value
      }
    }
    return (
      <Form.Item
        rules={[{
          required: true,
          message: 'A Marlin release must be selected'
        }]}
      >
        <Select 
          size="large"
          disabled={this.props.saving}
          loading={this.state.loading || this.state.release == 0}
          placeholder="Select Marlin release"
          options={this.state.releases.map((r, i) => option(r.name, i))}
          onSelect={(val:number) => this.setState({
            ...this.state,
            release: this.state.releases[val]
          })}
        />
      </Form.Item>
    )
  }

  renderName() {
    return (
      <Form.Item
        rules={[{
          required: true,
          message: 'Configuration name is required'
        }]}
      >
        <Input
          allowClear
          disabled={this.props.saving}
          size="large"
          placeholder="Config name"
          value={this.state.name || ''}
        
          onChange={e => this.setState({name: e.currentTarget.value.length > 0 ? e.currentTarget.value : null})}
        />
      </Form.Item>
    )
  }

  renderError() {
    if(!this.state.error || this.state.error.length < 1) return

    return (
      <Form.Item>
        <Row>
          <Col flex={1}>
            <Alert message={this.state.error} type="error" showIcon/>
          </Col>
        </Row>
      
        <br/>
      </Form.Item>
    )
  }

  renderForm() {
    return (
      <Form>
        {this.renderError()}
        {this.renderName()}
        {this.renderVersions()}
      </Form>
    )
  }

  renderLayout() {
    return (
      <Layout style={{background: 'transparent', width: '100%'}}>
        <Row align="top">
          <Col flex={1}>{this.renderForm()}</Col>
        </Row>
      </Layout>
    )
  }

  renderFooter() {
    return (
      <Row align="middle" justify="space-around" gutter={[10, 0]}>
        <Col>
          {this.props.saving && (
            <Spin size="small"/>
          )}
        </Col>

        <Col flex={1}>
          <p style={{textAlign: 'left', fontSize: 12, color: 'rgba(0, 0, 0, 0.5)'}}>{this.props.saveStatus}</p>
        </Col>
        
        <Col>
          <Button 
            type="ghost"
            onClick={this.closeAction}
          >
            Cancel
          </Button>
        </Col>
        
        <Col>
          <Button 
            loading={this.props.saving}
            type="primary"
            onClick={() => this.setState({error: null}, () => this.saveAction())}
          >
            Save
          </Button>
        </Col>
      </Row>
    )
  }

  render() {
    return (
      <Modal
        footer={this.renderFooter()}
        title="Add Marlin Configuration"
        visible={this.props.visible}
        okText="Save"
        maskClosable={false}
        confirmLoading={this.props.saving}
      >

        {this.renderLayout()}
      </Modal>
    )
  }
}