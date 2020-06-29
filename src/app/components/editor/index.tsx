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


export default class extends React.Component {
  buffer = null

  get content():string {
    return '; GCodes'
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
  }

  updateDimensions() {
    this.editor.layout()
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions)

    this.editor.focus()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)

    this.model.dispose()
    this.editor.dispose()
  }

  render() {
    return (
      <>
      <Toolbar
        path={["kevin", "sux"]}
      />

      <div id="text-editor">
        <div id="text-editor-buffer" ref={el => this.buffer = el} />
      </div>
      </>
    )
  }
}
