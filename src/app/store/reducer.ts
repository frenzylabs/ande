//
//  reducer.ts
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/04/20
//  Copyright 2020 Wess Cope
//

import {Reducer} from 'redux'

import {
  State,
  initialState
} from './state'

import {
  ActionType,
  ActionIdentifier
} from './action'

const reducer:Reducer = (state:State = initialState, action:ActionType):State => {
  switch(action.type) {
    case ActionIdentifier.LIST:
      return {
        ...state,
        ports: action.payload
      }
    case ActionIdentifier.CONNECT:
      return {
        ...state,
        connection: action.payload
      }

    case ActionIdentifier.CONNECTED:
      return {
        ...state,
        connection: {
          ...state.connection,
          status: action.payload
        }
      }

    case ActionIdentifier.DISCONNECT:
      return {
        ...state,
        connection: {
          ...state.connection,
          status: action.payload
        }
      }

    case ActionIdentifier.SEND:
      return {
        ...state,
        outgoing: state.outgoing.concat([action.payload])
      }
    
    case ActionIdentifier.SENT:
      return {
        ...state,
        outgoing: state.outgoing.filter(item => item != action.payload)
      }

    case ActionIdentifier.RECEIVED:
      return {
        ...state,
        buffer: state.buffer.concat([action.payload])
      }
      
    case ActionIdentifier.PORT:
      return {
        ...state,
        connection: {
          ...state.connection,
          port: action.payload
        }
      }

    case ActionIdentifier.BAUD:
      return {
        ...state,
        connection: {
          ...state.connection,
          baudrate: action.payload
        }
      }

    case ActionIdentifier.CLEAR:
      return {
        ...state,
        buffer: []
      }


    case ActionIdentifier.CONTROLS:
      return {
        ...state,
        controls: !state.controls
      }

    case ActionIdentifier.LOAD_MACROS:
      return {
        ...state,
        macros: action.payload || []
      }

    default: return state
  }
}

export default reducer
