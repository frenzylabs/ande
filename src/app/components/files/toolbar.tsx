//
//  toolbar.tsx
//  marshal
// 
//  Created by Wess Cope (wess@frenzylabs.com) on 06/26/20
//  Copyright 2020 Frenzy Labs, LLC
//

import React from 'react'

import {
  Icon,
  IconComponent
} from '../../icon'

interface Props {
  title?: String
  newFileHandler: () => void
  refreshHandler: () => void
}

export default class extends React.Component<Props> {
  
  get title():String {
    return this.props.title || "Files"
  }

  constructor(props:Props) {
    super(props)

    this.fileAddAction = this.fileAddAction.bind(this)
    this.refreshAction = this.refreshAction.bind(this)
  }

  fileAddAction(_e) {
    this.props.newFileHandler()
  }

  refreshAction(_e) {
    this.props.refreshHandler()
  }

  renderOption(icon:Icon, action: (e) => void) {
    return (
      <div className="files-toolbar-option">
        <button onClick={action}>
          <IconComponent icon={icon}/>
        </button>
      </div>
    )
  }

  render() {
    return (
      <div id="files-toolbar">
        <div id="files-toolbar-title">{this.title}</div>

        <div className="flex-space"/>

        {this.renderOption(Icon.filePlus, this.fileAddAction)}
        {this.renderOption(Icon.sync, this.refreshAction)}

      </div>
    )
  }
}
