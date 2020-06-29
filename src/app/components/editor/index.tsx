//
//  index.tsx
//  ande
// 
//  Created by Wess Cope (wess@frenzylabs.com) on 06/26/20
//  Copyright 2020 Frenzy Labs, LLC
//

import React      from 'react'
import {connect}  from 'react-redux'
import Component  from '../../types/component'

import lazy from '../../../libs/lazy'

import {
  editor
} from 'monaco-editor'


import Language from './language'
import Toolbar  from './toolbar'


export default class extends Component {
  buffer = null

  get content():string {
    return this.props.content || '; GCodes'
  }

  @lazy get model():editor.ITextModel {
    return editor.createModel(
      this.content,
      Language
    )
  }

  @lazy get editor():editor.IStandaloneCodeEditor {
    return editor.create(this.buffer, {
      language:         Language,
      automaticLayout:  true,
      minimap:          { enabled: false},
      tabSize:          2,
      insertSpaces:     true,
      wordWrap:         "on",
      model:            this.model,
      scrollBeyondLastLine: false
    })
    
  }

  constructor(props: any) {
    super(props)

    this.updateDimensions = this.updateDimensions.bind(this)
    this.run  = this.run.bind(this)
    this.save = this.save.bind(this)
  }

  
  updateDimensions() {
    this.editor.layout()
  }

  run() {
    if(this.props.run) {
      this.props.run(this.model.getValue())
    }
  }

  save() {
    if(this.props.save) {
      this.props.save(this.model.getValue())
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions)

    this.signal.subscribe('menu.save', () => {
      this.save()
    })
    this.signal.unsubscribe('menu.save')


    this.editor.focus()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
    this.signal.unsubscribe('menu.save')
    
    this.model.dispose()
    this.editor.dispose()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.content != this.content) {
      this.model.setValue(this.content)
    }
  }

  render() {
    return (
      <>
      <Toolbar
        path={this.props.path || []}
        saveCommand={this.save}
        runCommand={this.run}
        trashCommand={this.props.trashCommand}
      />

      <div id="text-editor">
        <div id="text-editor-buffer" ref={el => this.buffer = el} />
      </div>
      </>
    )
  }
}
