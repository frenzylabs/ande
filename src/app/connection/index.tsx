//
//  index.ts
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/01/20
//  Copyright 2020 Wess Cope
//

import React      from 'react'
import {connect}  from 'react-redux'

import Component  from '../types/component'
import Action     from '../store/action/connection'

import Serialport from '../types/serialport'
import {Command}  from '../commands'

export enum ConnectionStatus {
  connecting    = "CONNECTION.STATUS.CONNECTING",
  connected     = "CONNECTION.STATUS.CONNECTED",
  disconnected  = "CONNECTION.STATUS.DISCONNECTED"
}

class Connection extends Component {
  port    = null
  parser  = new Serialport.parsers.Readline({delimiter: '\n'})
  
  muted   = false
  locked  = false

  constructor(props:any) {
    super(props)

    this.connect  = this.connect.bind(this)
    this.read     = this.read.bind(this)
    this.write    = this.write.bind(this)
    this.send     = this.send.bind(this)
  }

  list() {
    Serialport.list()
    .then((data) => {
      this.dispatch(
        Action.listPorts(data)
      )
    })
  }

  connect() {
    if(this.port && this.port.isOpen) { return }

    const config = {
      autoOpen: false, 
      baudRate: this.props.baudrate,
      lock: false
    }

    this.port = Serialport(this.props.port, config)
    this.port.pipe(this.parser)

    this.parser.on('data', this.read)

    this.port.on('read', (...args) => {
      console.log("############## READ: ", args)
    })

    this.port.open((err) => {
      if(err) {
        this.dispatch(
          Action.received(`[Error]: ${err}`)
        )
        return
      }

      this.send(Command.firmware.info, err => {
        if(err) {
          this.dispatch(
            Action.received(`[Error]: Initial command error (${err})`)
          )
          return
        }

        this.dispatch(
          Action.connected()
        )
      })

      this.port.on('close', () => {
        console.log("CLOSED")
        console.log("###################### BKLSDBJKSDBHVLSDFJKVHBS")
  
      })
  
      process.on('uncaughtException', function(err) {
        this.disconnect()
      })
  
    })
  }

  read(data) {
    const response = data.toString()
    const quiet   = ['ok']
    
    if(quiet.includes(response)) { return }

    if(response.startsWith('//')) {
      this.muted = response.replace("//", "").trim() == "buffer:mute:true" ? true : false
    }

    if(this.muted == false) {
      this.dispatch(Action.received(response))
    }
  }

  write() {
    if(this.port == null 
        || this.port.isOpen == false
        || this.props.status != ConnectionStatus.connected 
        || this.props.outgoing.length == 0
    ) { return }

    this.props.outgoing.forEach(item => {
      this.send(item, (err) => {
        if(err) {
          this.dispatch(
            Action.received(`[Error]: Unable to send (${err})`)
          )

          return
        }

        this.dispatch(
          Action.sent(item)
        )  
      })
    })
  }

  send(line, callback?:(err) => void, wait:boolean = true) {
    setTimeout(() => {
      this.port.write(line + '\r\n')

      if(wait) {
        this.port.drain(callback)
      }  
    }, 300)
  }

  disconnect() {
    if(this.port == null || this.port.isOpen == false) { return }

    this.port.close()
  }

  handleConnection() {
    switch(this.props.status) {
      case ConnectionStatus.connecting:
        this.connect()
        break
      case ConnectionStatus.disconnected:
        this.disconnect()
        break
      default:
        break
    }
  }

 
  componentDidMount() {
    this.list()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.status != this.props.status) { 
      this.handleConnection()
    }

    if(this.props.outgoing.length > 0 && this.props.status == ConnectionStatus.connected) {
      this.write()
    }
    
    if((this.props.ports || []).length < 1 && this.props.status == ConnectionStatus.disconnected) {
      this.list()
    }
  }

  render() {
    return this.props.children
  }
}

const mapStateToProps = (state) => {
  return state.connection
}

export default connect(mapStateToProps)(Connection)

