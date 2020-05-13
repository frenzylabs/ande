//
//  index.tsx
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/11/20
//  Copyright 2020 Wess Cope
//

import React      from 'react'
import Component  from '../../types/component'

import FileList from './list'
import Editor   from './editor'
import Provider from './provider'

export default class extends Component {
  provider = new Provider()

  state = {
    selected: null,
    content: ""
  }

  constructor(props:any) {
    super(props)

    this.loadContent  = this.loadContent.bind(this)
    this.updateContent = this.updateContent.bind(this)
    this.didSelect    = this.didSelect.bind(this)
  }

  loadContent(path:string|null = null):string {
    if(!path) {
      return ""
    }

    return this.provider.read(path) ?? ""
  }

  updateContent(value) {
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

  render() {
    return (
      <div id="macros">
        <FileList provider={this.provider} didSelect={this.didSelect}/>
        <Editor 
          file={this.state.selected == null ? null : this.state.selected.file}
          content={this.state.content} 
          updateContent={this.updateContent}
        />
      </div>
    )
  }
}
