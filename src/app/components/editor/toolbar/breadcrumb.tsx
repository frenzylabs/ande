//
//  breadcrumb.tsx
//  marshal
// 
//  Created by Wess Cope (wess@frenzylabs.com) on 06/25/20
//  Copyright 2020 Frenzy Labs, LLC
//

import React from 'react'

const RightChevron = require( '../../../images/thin-right-chevron.svg')

export default class extends React.Component<{crumbs: Array<String>}> {
  renderRow(name, key) {
    return (
      <div className="crumb" key={key}>{name}</div>
    )
  }

  renderDivider(key) {
    return (
      <div className="crumb" key={key}><img src={RightChevron}/></div>
    )
  }

  render() {
    return (
      <div id="editor-breadcrumb">
      {this.props.crumbs.length > 0 &&
        this.props.crumbs
        .map<React.ReactNode>((p, i) => this.renderRow(p, `path-item-${i}`))
        .reduce((p, c, i) => [
          p, 
          this.renderDivider(`path-divider-${i}`), 
          c
        ])
      }
      </div>
    )
  }
}
