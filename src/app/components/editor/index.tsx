//
//  index.tsx
//  ande
// 
//  Created by Wess Cope (wess@frenzylabs.com) on 06/08/20
//  Copyright 2020 Frenzy Labs, LLC
//

import React        from 'react'
import Component    from '../../types/component'
import MonacoEditor from 'react-monaco-editor'

import Action from '../../store/action/connection'

import {id} from './language'

import {
  Dropdown,
  Menu,
  Breadcrumb
} from 'antd'

import Icon, {IconComponent} from '../../icon'

import Console from './console'

export default class extends Component {
  
  state = {
    consoleShowing: this.userDefaults.get('macro_console_show', false)
  }
  
  get options() {
    return {
      minimap:              {enabled: false},
      // automaticLayout:      true,
      scrollBeyondLastLine: false
    }
  }

  constructor(props:any) {
    super(props)

    this.getLine            = this.getLine.bind(this)
    this.runLine            = this.runLine.bind(this)
    this.renderBreadcrumb   = this.renderBreadcrumb.bind(this)
    this.renderControls     = this.renderControls.bind(this)
    this.renderToolbar      = this.renderToolbar.bind(this)
    this.editorDidMount     = this.editorDidMount.bind(this)
    this.getEditorLine      = this.getEditorLine.bind(this)
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

  getEditorLine(editor) {
    const pos   = editor.getPosition()
    const text  = editor.getValue(pos)
    const lines = text.split("\n")
    const line  = lines[pos.lineNumber - 1]

    this.runLine(line)
  }

  editorDidMount(editor, monaco) {
    editor.addAction({
      id: "run",
      label: "Run line",
      contextMenuGroupId: "g_run_line",
      run: this.getEditorLine
    })
    editor.focus()
  }

  
  renderBreadcrumb() {
    const crumbs = ['macros'].concat(
      (this.props.file.split('macros')[1]).split('/').filter(item => item.length > 0)
    ).map((item, index) => (
      <Breadcrumb.Item key={index}>{item.replace('.gcode', '')}</Breadcrumb.Item>
    ))

    return (
      <div id="macro-file-path">
        <Breadcrumb separator=">">
          {crumbs}
        </Breadcrumb>
      </div>
    )
  }

  renderControls() {
    return (
      <div id="macro-file-controls">
        {(this.props.content || "").length > 0 && (
          <a onClick={this.props.run}><IconComponent icon={Icon.play}/></a>
        )}
        <a onClick={this.props.save}><IconComponent icon={Icon.save}/></a>
        <a onClick={this.props.delete}><IconComponent icon={Icon.trash}/></a>
      </div>
    )
  }

  renderToolbar() {
    if(!this.props.file) { return }

    return (
      <>
        {this.renderBreadcrumb()}
        {this.renderControls()}
      </>
    )
  }

  render() {
    return (
      <div id="editor-stack">
        <div id="editor-toolbar">
          {this.props.content != null && this.renderToolbar()}
        </div>

        <MonacoEditor
          width="100%"
          height={this.state.consoleShowing ? "calc(100% - 300px)" : "100%"}
          language={id}
          value={this.props.content}
          options={this.options}
          onChange={(newValue, e) => this.props.update(newValue) }
          editorDidMount={this.editorDidMount}
        />

        <Console consoleChanged={(showing) => {
          this.setState({
            consoleShowing: showing
          })
        }}/>
      </div>
    )
  }
}
