//
//  index.tsx
//  marshal
// 
//  Created by Wess Cope (wess@frenzylabs.com) on 06/26/20
//  Copyright 2020 Frenzy Labs, LLC
//

import React from 'react'

import Toolbar  from './toolbar'

import {
  Icon,
  IconComponent
} from '../../icon'

import {
  FileNode, 
  FileModel
} from './node'

interface Props {
  title?:string
  tree?:FileModel[]
  selected?: number
  onFileSelect?:(FileModel) => void
  onFileCreate?:(string) => void
  onRefresh?:() => void
}

export default class extends React.Component<Props> {
  newFileInputRef = null

  state = {
    showNewFile:  false,
    newFileName:  ""
  }

  get data():FileModel[] {
    return this.props.tree || []
  }

  constructor(props:Props) {
    super(props)

    this.onFileSelect = this.onFileSelect.bind(this)
    this.onRefresh    = this.onRefresh.bind(this)
    this.onNewFile    = this.onNewFile.bind(this)
    this.enter        = this.enter.bind(this)
    this.esc          = this.esc.bind(this)
    this.onKey        = this.onKey.bind(this)
    this.renderNode   = this.renderNode.bind(this)
  }

  onRefresh() {
    if(!this.props.onRefresh) {
      this.props.onRefresh()
    }
  }

  onNewFile() {
    this.setState({
      showNewFile: true
    })
  }

  onFileSelect(model, index) {
    if(!this.props.onFileSelect) { return }

    this.setState({selected: index}, () => this.props.onFileSelect(model))
  }

  enter(e) {
    if(!this.props.onFileCreate || this.state.newFileName.length < 1) { return }

    this.props.onFileCreate(this.state.newFileName)
    
    this.esc()
  }

  esc() {
    this.setState({
      newFileName: "",
      showNewFile: false
    })
  }

  onKey(e) {
    switch(e.keyCode) {
      case 27:
        this.esc()
        return

      case 13:  //Enter
        this.enter(e)
        return

      default: return
    }
  }

  renderNode(value, index) {
    const selected = value.file == (this.props.selected && this.props.selected['file'])

    return (
      <FileNode 
        model={value} 
        key={`file-node-${index}`} 
        selected={selected} 
        onSelect={model => this.onFileSelect(model, index)}
      />
    )
  }

  renderNewFile() {
    return (
      <div id="files-new-file">
        <div><IconComponent icon={Icon.file}/></div>
        <div>
          <input
            type="text"
            ref={el => this.newFileInputRef = el}
            value={this.state.newFileName}
            onKeyUp={this.onKey}
            onChange={(e) => this.setState({newFileName: e.currentTarget.value})}  
          />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div id="files">
        <Toolbar
          title={this.props.title || "Files"}
          newFileHandler={this.onNewFile}
          refreshHandler={this.onRefresh}
        />

        <div>
          {this.data.map(this.renderNode)}
        </div>

        {this.state.showNewFile && this.renderNewFile() }
      </div>
    )
  }
}
