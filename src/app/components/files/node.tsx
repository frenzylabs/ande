//
//  node.tsx
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

export interface FileModel {
  title: string
  name: string
  file: string
  key: number | string
  children?:FileModel[]
}

interface Props {
  model:FileModel
  selected: boolean,
  onSelect: (FileModel) => void
}

export class FileNode extends React.Component<Props> {

  state = {
    expanded: false
  }

  get children():FileModel[] {
    return this.props.model.children || []
  }

  get icon():Icon {
    return this.children.length > 0 ? Icon.folder : Icon.file
  }

  constructor(props:any) {
    super(props)

    this.renderIcon = this.renderIcon.bind(this)
  }

  renderIcon() {
    return (
      <div className="file-node-icon">
        <IconComponent icon={this.icon} />
      </div>
    )
  }

  render() {
    var css = ['file-node']

    if(this.props.selected) {
      css.push('selected')
    }

    return (
      <div className={css.join(" ")} onClick={() => this.props.onSelect(this.props.model)}>
        {this.renderIcon()}

        <div className="file-node-title">
          {this.props.model.title}
        </div>
      </div>
    )
  }
}

export default FileNode
