//
//  controlbar.tsx
//  marshal
// 
//  Created by Wess Cope (wess@frenzylabs.com) on 06/25/20
//  Copyright 2020 Frenzy Labs, LLC
//

import React from 'react'

import {
  Icon,
  IconComponent
} from '../../../icon'

export interface ControlOption {
  icon:   Icon
  id:     String
  title?: String
  help?:  String
}

export type ControlOptionHandler = (ControlOption) => void

export default class extends React.Component<{options: Array<ControlOption>, didSelectOption: ControlOptionHandler}> {

  constructor(props:any) {
    super(props)

    this.renderButton = this.renderButton.bind(this)
  }

  renderButton(option:ControlOption) {
    return (
      <div className="editor-controlbar-option" key={`${option.id}`}>
        <button onClick={() => this.props.didSelectOption(option) }>
          <IconComponent icon={option.icon}/>
        </button>
      </div>
    )
  }

  render() {
    return (
      <div id="editor-controlbar">
        {this.props.options.map(this.renderButton)}
      </div>
    )
  }
}
