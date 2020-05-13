//
//  list.tsx
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/11/20
//  Copyright 2020 Wess Cope
//

import React      from 'react'
import {connect}  from 'react-redux'
import Component  from '../../../types/component'
import Provider   from '../provider'

import {Tree} from 'antd'
import { DownOutlined } from '@ant-design/icons'

import Toolbar from './toolbar'

class MacroList extends Component {

  state = {
    expanded: []
  }

  constructor(props:any) {
    super(props)

    this.toggleParent = this.toggleParent.bind(this)
    this.onSelect     = this.onSelect.bind(this)
    this.onExpand     = this.onExpand.bind(this)
  }

  toggleParent(node) {
    if(node.expanded) {
      this.setState({
        expanded: this.state.expanded.filter(key => key != node.key)
      })
    } else if(!this.state.expanded.includes(node.key)) {
      this.setState({
        expanded:  this.state.expanded.concat([node.key])
      })
    }
  }

  onSelect(keys, info) {
    const {node} = info

    if(!node.isLeaf) {
      this.toggleParent(node)

      return
    }

    if(!this.props.didSelect) { return }

    this.props.didSelect({
      title: node.title,
      file: node.file
    })
  }

  onExpand(keys, info) {
    const {node} = info

    if(!node.isLeaf) {
      this.toggleParent(node)
      
      return
    }
  }

  componentDidMount() {
    this.props.provider.load()
  }

  componentDidUpdate(prevProps, _) {
    const current = this.props.macros || []
    const prev    = prevProps.macros  || []

    if(prev.length != current.length) {
      this.props.provider.load()
    }
  }

  render() {
    return (
      <section id="macro-list">
        <h3>Macros</h3>
        <div id="macro-files">
          <Tree
            showLine
            blockNode
            switcherIcon={<DownOutlined />}
            expandedKeys={this.state.expanded}
            treeData={this.props.macros}
            onSelect={this.onSelect}
            onExpand={this.onExpand}
          >
          </Tree>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    macros: state.macros
  }
}

export default connect(mapStateToProps)(MacroList)
