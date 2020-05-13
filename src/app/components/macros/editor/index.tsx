//
//  editor.tsx
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/11/20
//  Copyright 2020 Wess Cope
//

import React      from 'react'
import Component  from '../../../types/component'
import Editor     from 'react-simple-code-editor'
import Prism      from 'prism-react-renderer/prism'
import Highlight, {defaultProps} from 'prism-react-renderer'

(typeof global !== "undefined" ? global : window)['Prism'] = Prism

require("prismjs/components/prism-gcode")

import Action from '../../../store/action'

import {
  Dropdown,
  Menu,
  Breadcrumb
} from 'antd'

export default class extends Component {

  constructor(props:any) {
    super(props)

    this.getLine            = this.getLine.bind(this)
    this.runLine            = this.runLine.bind(this)
    this.renderContextMenu  = this.renderContextMenu.bind(this)
    this.renderLineNumber   = this.renderLineNumber.bind(this)
    this.renderBreadcrumb   = this.renderBreadcrumb.bind(this)
    this.highlight          = this.highlight.bind(this)
  }

  getLine(line) {
    const index = line - 1
    const lines = (this.props.content || "").split(/\n/)

    if(lines.length < 1 || lines.length < line) { return }

    return lines[index]
  }

  runLine(line) {
    this.dispatch(
      Action.send(
        this.getLine(line)
      )
    )
  }

  renderContextMenu(line) {
    return (
      <Menu>
        <Menu.Item key={line} onClick={e => this.runLine(line)}>Run line</Menu.Item>
      </Menu>
    )
  }

  renderLineNumber(number) {
    return (
      <Dropdown overlay={this.renderContextMenu(number)} trigger={['contextMenu']}>
        <a className="line-number">{number}</a>
      </Dropdown>
    )
  }

  highlight(code) {
    return (
      <Highlight {...defaultProps} code={code} language="gcode">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <>
            {tokens.map((line, key) => (
              <div className="line" key={key} {...getLineProps({line, key})}>
                {this.renderLineNumber(key + 1)}

                <span className="line-content">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({token, key})}/>
                  ))}
                </span>
              </div>
            ))}
          </>
        )}
      </Highlight>
    )
  }

  renderBreadcrumb() {
    if(!this.props.file) { return }

    const crumbs = ['macros'].concat(
      (this.props.file.split('macros')[1]).split('/').filter(item => item.length > 0)
    ).map((item, index) => (
      <Breadcrumb.Item key={index}>{item.replace('.gcode', '')}</Breadcrumb.Item>
    ))

    return (
      <Breadcrumb separator=">">
        {crumbs}
      </Breadcrumb>
    )
  }

  render() {
    return (
      <div id="editor-stack">
        <div id="editor-crumbs">
          {this.renderBreadcrumb()}
        </div>

        <section id="macro-editor">
          <div id="editor-buffer">
            <Editor
              id="editor-textarea"
              value={this.props.content}
              onValueChange={this.props.updateContent}
              highlight={this.highlight}
            />
          </div>
        </section>
      </div>
    )
  }
}
