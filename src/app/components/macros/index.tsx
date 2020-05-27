//
//  index.tsx
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/11/20
//  Copyright 2020 Wess Cope
//

import React      from 'react'
import Component  from '../../types/component'
import Action     from '../../store/action/connection'

import { 
  Modal
} from 'antd';

import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

import Icon, {IconComponent} from '../../icon'

import Provider from './provider'
import FileList from './list'
import Editor   from './editor'
import Console  from './console'

export default class extends Component {
  provider = Provider

  state = {
    selected: null,
    content: null,
    showNew: false
  }

  constructor(props:any) {
    super(props)

    this.loadContent    = this.loadContent.bind(this)
    this.create         = this.create.bind(this)
    this.save           = this.save.bind(this)
    this.update         = this.update.bind(this)
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

  save() {
    if(this.state.selected == null) { return }

    const {file} = this.state.selected

    this.provider.save(file, this.state.content)
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

  update(value) {
    this.setState({
      ...this.state,
      content: value
    })
  }
 
  didSelect(node) {
    if(this.state.selected && node.file === this.state.selected.file) { return }

    this.setState({
      selected: node,
      content: this.loadContent(node.file)
    })

  }

  run() {
    if(this.state.content == null) { return }

    this.state.content.split("\n")
    .map(line => line.trim())
    .forEach(line =>
      this.dispatch(
        Action.send(line)
      )
    )
  }

  renderEditor() {
    if(this.state.content == null) {
      return ( 
        <div id="macros-empty">
          <div id="empty-content">
            <h1><IconComponent icon={Icon.harddrive}/></h1>
            <h3>Why not select or create a new Macro?</h3>
          </div>
        </div>
      )
    }

    return (
      <Editor 
        file={this.state.selected == null ? null : this.state.selected.file}
        content={this.state.content} 
        update={this.update}
        save={this.save}
        delete={this.delete}
        run={this.run}
      />
    )
  }

  render() {
    return (
      <div id="macros">
        <FileList 
          provider={this.provider} 
          didSelect={this.didSelect}
          create={this.create}
          showNew={this.state.showNew}
          toggleNewFile={this.toggleNewFile}
        />

        <div id="macro-content">
          {this.renderEditor()}
          <Console/>
        </div>
      </div>
    )
  }
}
