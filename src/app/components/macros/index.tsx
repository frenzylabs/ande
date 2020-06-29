//
//  index.tsx
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/11/20
//  Copyright 2020 Wess Cope
//

import React      from 'react'
import {connect}  from 'react-redux'
import Component  from '../../types/component'
import Action     from '../../store/action/connection'

import { 
  Modal
} from 'antd';

import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

import Files    from '../files'
import Editor   from '../editor'
import Console  from '../console'
import Provider from './provider'

class Macros extends Component {
  provider = Provider

  state = {
    selected:   null,
    content:    null,
    showNew:    false,
  }

  constructor(props:any) {
    super(props)

    this.loadContent    = this.loadContent.bind(this)
    this.create         = this.create.bind(this)
    this.save           = this.save.bind(this)
    this.delete         = this.delete.bind(this)
    this.run            = this.run.bind(this)
    this.didSelect      = this.didSelect.bind(this)
    this.toggleNewFile  = this.toggleNewFile.bind(this)
  }

  loadContent(path:string|null = null):string {
    if(path == null) {
      return ""
    }

    return this.provider.read(path)
  }

  create(name:string) {
    const fullpath = this.provider.cleanName(name)

    if(this.provider.exists(name)) {
      
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: `file "${name} exists, do you want to overwrite it?`,
        onOk: () => {
          this.provider.delete(fullpath)
          this.provider.create(name)

          this.setState({showNew: false})
        },
        onCancel: () => {}
      })

      return
    }

    this.provider.create(name)

    this.setState({showNew: false})
  }

  toggleNewFile(show:boolean) {
    this.setState({
      showNew: show
    })
  }

  save(content) {
    if(this.state.selected == null) { return }

    const {file} = this.state.selected

    this.provider.save(file, content)
  }

  delete() {
    if(this.state.selected == null) { return }

    confirm({
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete ${this.state.selected.title}`,
      onOk: () => {
        const {file} = this.state.selected

        this.setState({
          selected: null,
          content: ""
        }, () => {
          this.provider.delete(file)
        })    
      },
      onCancel: () => {}
    })
  }

  didSelect(node) {
    if(this.state.selected && node.file === this.state.selected.file) { return }

    const content = this.loadContent(node.file)

    this.setState({
      selected: node,
      content: content
    })

    this.userDefaults.set('macro.current', JSON.stringify(node))
  }

  run(content) {
    this.save(content)

    content.split("\n")
    .map(line => line.trim())
    .forEach(line =>
      this.dispatch(
        Action.send(line)
      )
    )
  }

  componentDidMount() {
    const cached = this.userDefaults.get('macro.current')

    if(!cached) { return }

    const node = JSON.parse(cached)
    
    if(node) {
      this.didSelect(node)
    }
  }

  render() {
    return (
      <div id="macros">
        <div id="macros-master">
          <Files
            title="Macros"
            selected={this.state.selected}
            tree={this.props.macros || []}
            onFileSelect={this.didSelect}
            onFileCreate={this.create}
            onRefresh={this.provider.load}
          />
        </div>

        <div id="macros-detail">
          <Editor
            path={['macros', (this.state.selected && this.state.selected['title']) || '']}
            content={this.state.content}
            save={this.save}
            run={this.run}
            trashCommand={this.delete}
          />

          <Console/>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    macros: state.data.macros
  }
}

export default connect(mapStateToProps)(Macros)
