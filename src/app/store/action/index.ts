//
//  index.ts
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/04/20
//  Copyright 2020 Wess Cope
//

import {ConnectionStatus} from '../../connection'

import {
  ActionIdentifier,
  ListAction,
  ConnectAction,
  ConnectedAction,
  DisconnectAction,
  ReceivedAction,
  PortAction,
  BaudAction,
  SendAction,
  SentAction,
  ClearAction,
  ControlsAction,
  LoadMacrosAction
} from './type'

export default {
  list:(ports):ListAction => {
    return {
      type: ActionIdentifier.LIST,
      payload: ports
    }
  },

  connect:(port:string, baudrate:number):ConnectAction => {
    return {
      type: ActionIdentifier.CONNECT,
      payload: {
        port,
        baudrate,
        status: ConnectionStatus.connecting
      }
    }
  },

  connected:():ConnectedAction => {
    return {
      type: ActionIdentifier.CONNECTED,
      payload: ConnectionStatus.connected
    }
  },

  disconnect:():DisconnectAction => {
    return {
      type: ActionIdentifier.DISCONNECT,
      payload: ConnectionStatus.disconnected
    }
  },

  send:(payload:string):SendAction => {
    return {
      type: ActionIdentifier.SEND,
      payload
    }
  },

  sent:(payload:string):SentAction => {
    return {
      type: ActionIdentifier.SENT,
      payload
    }
  },

  received:(payload:string):ReceivedAction => {
    return {
      type: ActionIdentifier.RECEIVED,
      payload
    }
  },

  port:(payload:string):PortAction => {
    return {
      type: ActionIdentifier.PORT,
      payload
    }
  },

  baud:(payload:number):BaudAction => {
    return {
      type: ActionIdentifier.BAUD,
      payload
    }
  },

  clear:():ClearAction => {
    return {
      type: ActionIdentifier.CLEAR
    }
  },

  controls:():ControlsAction => {
    return {
      type: ActionIdentifier.CONTROLS
    }
  },
  
  loadMacros:(payload:Array<object>):LoadMacrosAction => {
    return {
      type: ActionIdentifier.LOAD_MACROS,
      payload: payload
    }
  }
}

export {default as ActionType}  from './type'
export {ActionIdentifier}       from './type'
