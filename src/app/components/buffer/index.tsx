//
//  index.tsx
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/19/20
//  Copyright 2020 Wess Cope
//

import React      from 'react'
import {connect}  from 'react-redux'

import {
  ConnectionStatus
} from '../../connection'

import Spacer                 from '../spacer'
import Icon, {IconComponent}  from '../../icon'

class Buffer extends React.Component<any> {
  bottomRef = null

  state = {
    autoScroll: true
  }

  get emptyMessage():string {
    return this.props.status == ConnectionStatus.disconnected 
           ? "Printer is disconnected."
           : ""
  }

  get lines():[string] {
    return (this.props.buffer || []).length < 1 
            ? [(<li key={-1} className={this.buildClassName("empty")}><pre>{this.emptyMessage}</pre></li>)]
            : this.props.buffer.map((line, index) => (
                <li className={this.buildClassName()} key={`buffer-line-${index}`}><pre>{line.trim()}</pre></li>
            ))
  }

  constructor(props:any) {
    super(props)

    this.scrollToBottom = this.scrollToBottom.bind(this)
    this.pinBottom      = this.pinBottom.bind(this)
    this.buildClassName = this.buildClassName.bind(this)
  }

  scrollToBottom() {
    if(this.bottomRef == null) { return }

    this.bottomRef.scrollIntoView({behavior: 'smooth'})
  }

  pinBottom() {
    if(this.state.autoScroll == false) { return }

    this.scrollToBottom()
  }

  buildClassName(base:string = ""):string {
    const isConsole = this.props.isConsole === undefined ? "" : "is-console"
    
    return [base, isConsole].join(' ')
  }

  componentDidMount() {
    this.pinBottom()
  }

  componentDidUpdate() {
    this.pinBottom()
  }

  render() {
    return ( 
      <div className={this.buildClassName("buffer")}>
        <div className="output">
          <ul>
            {this.lines}

            <div ref={ele => this.bottomRef = ele}/>
          </ul>
        </div>
      </div>
    )
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      autoScroll: nextProps.autoScroll || true
    }
  }
}

const mapPropsToState = (state) => {
  return {
    buffer: state.connection.buffer,
    status: state.connection.status || ConnectionStatus.disconnected
  }
}

export default connect(mapPropsToState, null)(Buffer)
