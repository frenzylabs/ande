//
//  icon.tsx
//  matter
// 
//  Created by Wess Cope (me@wess.io) on 04/15/20
//  Copyright 2020 Wess Cope
//

import React from 'react'

import {
  IconLookup,
  IconDefinition,
  findIconDefinition,
  IconPrefix,
  IconName,
} from '@fortawesome/fontawesome-svg-core'

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome'


enum Icon {
  power       = "far power-off",
  cog         = "fal cog",
  cube        = "fal cube",
  folders     = "fal folders",
  extensions  = "fal plug",
  cam         = "fal webcam",
  harddrive   = "fal hdd",
  sdcard      = "fal sd-card",
  connections = "fal sitemap",
  browser     = "fal browser",
  circle      = "fas circle",
  trash       = "fas trash",
  up          = "fas caret-up",
  down        = "fas caret-down",
  left        = "fas caret-left",
  right       = "fas caret-right",
  home        = "fas home",
  equals      = "fas equals",
  times       = "fas times",
  asterisk    = "fas asterisk",
  terminal    = "fas terminal",
  stream      = "fas stream",
  save        = "fas save",
  windowClose = "fas window-close",
  filePlus    = "fal file-plus",
  folderPlus  = "fal folder-plus",
  sync        = "fal sync",
  question    = "fal question"
}

export class IconComponent extends React.Component<any, null> {

  get components():Array<string> {
    return this.props.icon.split(' ')
  }

  get prefix():IconPrefix {
    return this.components[0] as IconPrefix
  }

  get name():IconName {
    return this.components[1] as IconName
  }

  get lookup():IconLookup {
    return {prefix: this.prefix, iconName: this.name} 
  }

  get definition():IconDefinition {
    return findIconDefinition(this.lookup)
  }

  constructor(props:any) {
    super(props)
  }

  render() {
    return (
      <FontAwesomeIcon
        {...this.props}
        icon={this.definition}
      />
    )
  }
}

export default Icon
