//
//  buffer.tsx
//  ande
// 
//  Created by Wess Cope (wess@frenzylabs.com) on 06/29/20
//  Copyright 2020 Frenzy Labs, LLC
//

import React      from 'react'
import {connect}  from 'react-redux'
import Component  from '../../types/component'

export default class extends Component {
  bottomRef = null

  constructor(props:any) {
    super(props)

    this.stickBottom    = this.stickBottom.bind(this)
    this.scrollToBottom = this.scrollToBottom.bind(this)
  }

  stickBottom() {
    this.stickBottom()
  }

  scrollToBottom() {
    if(this.bottomRef == null) { return }

    this.bottomRef.scrollIntoView({behavior: 'smooth'})
  }

  renderRow(value, index) {
    return (
      <div className="console-buffer-row" key={`console-buffer-row-${index}`}>{value}</div>
    )
  }

  render() {
    return (
      <div id="console-buffer-context">
        {this.props.buffer.map(this.renderRow)}

        <div ref={el => this.bottomRef = el} />
      </div>
    )
  }

}

