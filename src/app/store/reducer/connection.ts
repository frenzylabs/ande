//
//  connection.ts
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/21/20
//  Copyright 2020 Wess Cope
//

import {Reducer}          from 'redux'
import Datastore          from '../../data'
import {ConnectionStatus} from '../../connection'

import {
  ConnectionAction,
  ConnectionActionType
} from '../action/connection'

export interface ConnectionState {
  ports:Array<string>
  port:string
  baudrate:number
  status:ConnectionStatus
  outgoing:Array<string>
  buffer:Array<string>
}

const initialState = {
  ports:    [],
  port:     Datastore.get('connection.port', null),
  baudrate: Datastore.get('connection.baudrate', null),
  status:   ConnectionStatus.disconnected,
  outgoing: [],
  buffer:   ['']
}

const reducer:Reducer = (state:ConnectionState = initialState, action:ConnectionActionType):ConnectionState => {
  switch(action.type) {
    case ConnectionAction.LIST_PORTS:
      return {
        ...state,
        ports: action.payload
      }
    case ConnectionAction.CLEAR_PORTS:
      return {
        ...state,
        port: null,
        ports: []
      }
    case ConnectionAction.CONNECT:
      return {
        ...state,
        ...action.payload
      }

    case ConnectionAction.CONNECTED:
      return {
        ...state,
        status: action.payload
      }

    case ConnectionAction.DISCONNECT:
      return {
        ...state,
        status: action.payload
      }

    case ConnectionAction.SEND:
      return {
        ...state,
        outgoing: state.outgoing.concat([action.payload])
      }
    
    case ConnectionAction.SENT:
      return {
        ...state,
        outgoing: state.outgoing.filter(item => item != action.payload)
      }

    case ConnectionAction.RECEIVED:
      return {
        ...state,
        buffer: state.buffer.concat([action.payload])
      }
    
    case ConnectionAction.CLEAR:
      return {
        ...state,
        buffer: []
      }

    case ConnectionAction.PORT:
      return {
        ...state,
        port: action.payload
      }

    case ConnectionAction.BAUD:
      return {
        ...state,
        baudrate: action.payload
      }

    default: return state
  }
}

export default reducer
