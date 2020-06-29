//
//  index.tsx
//  marshal
// 
//  Created by Wess Cope (wess@frenzylabs.com) on 06/25/20
//  Copyright 2020 Frenzy Labs, LLC
//

import React  from 'react'
import Icon   from '../../../icon'

import Controlbar from './controlbar'
import Breadcrumb from './breadcrumb'

interface Props {
  path?: string[]
  runCommand?:() => void
  saveCommand?:() => void
  trashCommand?:() => void
}

export default class extends React.Component<Props> {

  options = [
    {
      icon: Icon.play,
      id:   'control-play'
    },
    {
      icon: Icon.save,
      id:   'control-save'
    },
    {
      icon: Icon.trash,
      id:   'control-trash'
    }
  ]

  get path():string[] {
    return this.props.path ?? []
  }

  constructor(props:any) {
    super(props)

    this.didSelectOption = this.didSelectOption.bind(this)
  }

  didSelectOption(option) {
    switch(option.id) {
      case 'control-play':
        if(this.props.runCommand) { this.props.runCommand() }
        break
      case 'control-save':
        if(this.props.saveCommand) { this.props.saveCommand() }
        break
      case 'control-trash':
        if(this.props.trashCommand) { this.props.trashCommand() }
        break
    }
  }

  render() {
    return (
      <div id="editor-toolbar">
        <Breadcrumb crumbs={this.path} />

        <div className="flex-space"/>

        <Controlbar options={this.options} didSelectOption={this.didSelectOption} />
      </div>
    )
  }
}
