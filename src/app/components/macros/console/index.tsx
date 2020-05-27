//
//  index.tsx
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/18/20
//  Copyright 2020 Wess Cope
//

import React      from 'react'
import {connect}  from 'react-redux'
import Component  from '../../../types/component'

import Buffer from '../../buffer'

import Spacer                 from '../../spacer'
import Icon, {IconComponent}  from '../../../icon'

class Console extends Component {
  bottomRef = null

  state = {
    showing: this.userDefaults.get('macro_console_show', false)
  }

  constructor(props:any) {
    super(props)

    this.toggle         = this.toggle.bind(this)
    this.scrollToBottom = this.scrollToBottom.bind(this)
    this.renderBuffer   = this.renderBuffer.bind(this)
    this.renderStatus   = this.renderStatus.bind(this)
  }

  toggle() {
    const show = !this.state.showing

    this.setState({
      showing: show
    }, () => this.userDefaults.set('macro_console_show', show))
  }

  scrollToBottom() {
    if(this.bottomRef == null) { return }

    this.bottomRef.scrollIntoView({behavior: "smooth"})
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  renderBuffer() {
    if(this.state.showing == false) { return }

    return (
      <Buffer isConsole/>
    )
  }

  renderStatus() {
    if(this.state.showing || this.props.buffer.length < 1) {
      return <Spacer/>
    }

    return (
      <div onClick={() => this.setState({showing: !this.state.showing})}>
        <pre>{this.props.buffer[(this.props.buffer.length - 1)] || ""}</pre>
      </div>
    )
  }

  render() {
    return (
      <div id="console" className={this.state.showing ? "showing" : ""}>
        <div id="console-toolbar">
          <div>
            <h1>Console</h1>
          </div>

          <div/>

          <div>
            <a onClick={this.toggle}>
              <IconComponent icon={this.state.showing ? Icon.windowClose : Icon.browser}/>
            </a>
          </div>
        </div>

        {this.renderBuffer()}
      </div>
    )
  }
}

const mapPropsToState = (state) => {
  return {
    buffer: state.connection.buffer
  }
}

export default connect(mapPropsToState)(Console)
