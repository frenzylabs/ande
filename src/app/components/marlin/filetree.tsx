//
// filetree
// ande
// 
// Author:  Wess (me@wess.io)
// Created: 22/10/2020
// 
// Copyright (c) 2020 Wess.io
//


// const remote    = window.require('electron').remote
// const path      = remote.require('path')
// const fs        = remote.require('fs-extra')
// const klaw      = remote.require('klaw')
// const through2  = remote.require('through2')

import {
  walk
} from '../../system/file'

import React, { Children }      from 'react'
import {connect}  from 'react-redux'

import {
  Row,
  Col,
  Tree
} from 'antd'

interface FileObject {
  name:     string
  key:      string
  path:     string
  parent:   FileObject | null
  children: Array<FileObject> | null
}

interface Props {
  directory:string
  selectAction: Function
}

class FileTree extends React.Component<Props> {
  state = {
    filetree: null,
    selected: [],
  }

  constructor(props) {
    super(props)

    this.select = this.select.bind(this)
  }

  select(item, e) {
    this.setState({
      selected: [item]
    }, () => {
      this.props.selectAction(e.selectedNodes[0])
    })
  }

  componentDidMount() {
    this.setState({
      filetree: walk('/Users/wess/Desktop/configs/test')['children'] || []
    })
  }

  render() {
    return (
      <Tree.DirectoryTree 
        style={{flex: '1 1 auto', flexGrow: 1, overflowX: 'scroll', margin:'auto 0', background: '#f0f0f0'}}
        blockNode
        treeData={this.state.filetree || []}
        onSelect={this.select}
        selectedKeys={this.state.selected}
      />
    )
  }

}

export default connect()(FileTree)
