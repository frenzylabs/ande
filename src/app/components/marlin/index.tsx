//
// index
// ande
// 
// Author:  Wess (me@wess.io)
// Created: 21/10/2020
// 
// Copyright (c) 2020 Wess.io
//

import React      from 'react'
import {connect}  from 'react-redux'
import Component  from '../../types/component'

import {
  fs,
  path,
  walk
} from '../../system/file'

import {
  Layout,
  Row,
  Col,
  List,
  Button,
  Typography
} from 'antd'

import {Icon, IconComponent} from '../../icon'

import api      from './api'
import Modal    from './modal'
import FileTree from './filetree'
import Editor   from './editor'

const {Text} = Typography

class Marlin extends Component {
  state = {
    registry:   null,
    releases:   [],
    visible:    false,
    saving:     false,
    saveStatus: '',
    collapsed:  false,
    content:    null
  }

  get dataSource() {
    if(this.state.registry == null) {
      return []
    }

    return Object.keys(this.state.registry).map((k, i) => {
      return {
        key: `config-entry-${i}`,
        title: k,
        ...this.state.registry[k]
      }
    })
  }

  constructor(props:any) {
    super(props)

    this.load         = this.load.bind(this)
    this.close        = this.close.bind(this)
    this.save         = this.save.bind(this)
    this.fileSelected = this.fileSelected.bind(this)
  }

  load() {
    api.registry()
    .then(res => this.setState({
      ...this.state,
      registry: res
    }))
    .catch(err => console.log(err))
  }

  close() {
    this.setState({
      visible: false
    })
  }

  save({name, release}) {
    this.setState({
      saving: true
    }, () => {
      api.create(name, release, (status) => {
        this.setState({
          saveStatus: status
        })
      }, (err, res) => {

        this.setState({
          saving: false
        }, () => {
          this.close()
          this.load()
        })
      })  
    })
  }

  fileSelected(node) {
    const {path} = node

    fs.readFile(path, 'utf8')
    .then(res => this.setState({content: res}))
    .catch(console.error)
  }

  componentDidMount() {
    this.load()
  }

  renderListItem(item) {
    return (
      <List.Item key={item.key} style={{padding: '0'}}>
        <Button size="large" type="text" block>
          <Row align="middle" style={{width: '100%', height: '100%'}}>
            <Col flex={1}>
              <p style={{textAlign: 'start', fontSize: 14, padding: 0, fontWeight: 'bold'}}>
                {(item.title.substring(0, 1).toUpperCase() + item.title.substring(1))}
              </p>
            </Col>

            <Col>
              <p style={{fontSize: 12, color: 'rgba(0, 0, 0, 0.6)', textAlign: "end", padding: 0}}>{item.name}</p>
            </Col>
          </Row>
        </Button>
      </List.Item>
    )
  }

  render() {
    return (
      <>
        <Layout>
          <Layout.Sider theme="light" collapsed={this.state.collapsed}>
            <Row align="middle" style={{background: 'rgba(0, 0, 0, 0.01)', padding: '5px 10px', borderBottom: '1px solid rgba(0, 0, 0, 0.1)'}}>
              <Col flex={1}>
                
              </Col>

              <Col>
                <Button 
                  size="small" 
                  type="text" 
                  icon={<IconComponent icon={Icon.filePlus} />} 
                  onClick={e => this.setState({visible: true})}
                />
              </Col>
            </Row>

            <Row>
              <Col flex={1}>
              <List
                  size="large"
                  dataSource={this.dataSource}
                  renderItem={this.renderListItem}
                >
                </List>
              </Col>
            </Row>
          </Layout.Sider>

          <Layout>
            <Row style={{width: '100%', height: '100%'}}>
              <Col 
                span={5}
                style={{
                  background: '#f0f0f0', 
                  borderLeft: '1px solid rgba(0, 0, 0, 0.2)', 
                  borderRight: '1px solid rgba(0, 0, 0, 0.2)',
                }}
              >
                <FileTree 
                  directory="" 
                  selectAction={this.fileSelected}
                />
              </Col>

              <Col span={19} style={{border: '1px solid green', position: 'relative', height: '100%'}}>
                <Editor
                  content={this.state.content}
                />
              </Col>
            </Row>
          </Layout>
        </Layout>

        <Modal
          saving={this.state.saving}
          saveStatus={this.state.saveStatus}
          visible={this.state.visible}
          saveAction={this.save}
          closeAction={this.close}
        />
      </>
    )
  }
}

export default connect()(Marlin)
