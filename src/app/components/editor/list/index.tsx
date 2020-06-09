//
//  list.tsx
//  ande
// 
//  Created by Wess Cope (wess@frenzylabs.com) on 06/08/20
//  Copyright 2020 Frenzy Labs, LLC
//

import React      from 'react'
import {connect}  from 'react-redux'
import Component  from '../../../types/component'

import {
  Tree,
  Input
} from 'antd'

import { 
  DownOutlined ,
  FileTextOutlined
} from '@ant-design/icons'

import Toolbar from './toolbar'

class MacroList extends Component {

  input = null

  state = {
    newName: ""
  }

  constructor(props:any) {
    super(props)

    this.refresh          = this.refresh.bind(this)
    this.onSelect         = this.onSelect.bind(this)
    this.inputKeyHandler  = this.inputKeyHandler.bind(this)
    this.enter            = this.enter.bind(this)
    this.esc              = this.esc.bind(this)
  }

  refresh() {
    this.props.provider.load()
  }

  onSelect(keys, info) {
    const {node} = info

    if(!this.props.didSelect) { return }

    this.props.didSelect({
      title: node.title,
      file: node.file
    })
  }

  enter(e) {
    if(!this.props.create || this.state.newName.length < 1) { return }

    this.props.create(this.state.newName)
  }

  esc(e) {
    this.props.toggleNewFile(false)
  }

  inputKeyHandler(e) {
    switch(e.keyCode) {
      case 27:
        this.esc(e)
        return

      case 13:  //Enter
        this.enter(e)
        return

      default: return
    }
  }

  componentDidMount() {
    this.refresh()
  }

  componentDidUpdate(prevProps, _) {
    const current = this.props.macros || []
    const prev    = prevProps.macros  || []

    if(prev.length != current.length) {
      this.refresh()
    }

    if(this.props.showNew) {
      this.input.focus()
    }
  }

  renderNewFile() {
    return (
      <div id="new-macro-form">
        <Input 
          onKeyUp={this.inputKeyHandler}
          ref={(ele) => this.input = ele}
          size="small" 
          prefix={<FileTextOutlined style={{color: 'rgba(0, 0, 0, 0.4)'}} />}
          value={this.state.newName}
          onChange={(e) => this.setState({newName: e.currentTarget.value})}
        />
      </div>
    )
  }

  render() {
    return (
      <section id="macro-list">
        <Toolbar refresh={this.refresh} create={() => this.props.toggleNewFile(true)}/>

        <div id="macro-files">
          <Tree
            showLine
            blockNode
            switcherIcon={<DownOutlined />}
            treeData={this.props.macros}
            onSelect={this.onSelect}
          >
          </Tree>

          {this.props.showNew && this.renderNewFile()}
        </div>
      </section>
    )
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      newName: nextProps.showNew ? prevState.newName : ""
    }
   }
}

const mapStateToProps = (state) => {
  return {
    macros: state.data.macros
  }
}

export default connect(mapStateToProps)(MacroList)
