//
//  connection.ts
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/21/20
//  Copyright 2020 Wess Cope
//

import {ConnectionStatus} from '../../connection'

export enum ConnectionAction {
  LIST_PORTS  = "CONNECTION.ACTION.LIST_PORTS",
  CLEAR_PORTS = "CONNECTION.ACTION.CLEAR_PORTS",
  CONNECT     = "CONNECTION.ACTION.CONNECT",
  CONNECTED   = "CONNECTION.ACTION.CONNECTED",
  DISCONNECT  = "CONNECTION.ACTION.DISCONNECT",
  SEND        = "CONNECTION.ACTION.SEND",
  SENT        = "CONNECTION.ACTION.SENT",
  RECEIVED    = "CONNECTION.ACTION.RECEIVED",
  CLEAR       = "CONNECTION.ACTION.CLEAR",
  PORT        = "CONNECTION.ACTION.PORT",
  BAUD        = "CONNECTION.ACTION.BAUD",
}

export interface ListPortsAction {
  type: ConnectionAction.LIST_PORTS
  payload: Array<string>
}

export interface ClearPortsAction {
  type: ConnectionAction.CLEAR_PORTS
}

export interface ConnectAction {
  type: ConnectionAction.CONNECT
  payload: {
    port:string,
    baudrate:number,
    status:ConnectionStatus.connecting
  }
}

export interface ConnectedAction {
  type: ConnectionAction.CONNECTED
  payload: ConnectionStatus.connected

}

export interface DisconnectAction {
  type: ConnectionAction.DISCONNECT
  payload: ConnectionStatus.disconnected

}

export interface SendAction {
  type: ConnectionAction.SEND
  payload: string
}

export interface SentAction {
  type: ConnectionAction.SENT
  payload: string
}

export interface ReceivedAction {
  type: ConnectionAction.RECEIVED
  payload: string
}

export interface ClearAction {
  type: ConnectionAction.CLEAR
}

export interface PortAction {
  type: ConnectionAction.PORT
  payload:string
}

export interface BaudAction {
  type:ConnectionAction.BAUD
  payload:number
}

export type ConnectionActionType =
  | ListPortsAction
  | ClearPortsAction
  | ConnectAction
  | ConnectedAction
  | DisconnectAction
  | SendAction
  | SentAction
  | ReceivedAction
  | ClearAction
  | PortAction
  | BaudAction

export default {
  listPorts:(ports):ListPortsAction => {
    return {
      type: ConnectionAction.LIST_PORTS,
      payload: ports
    }
  },

  clearPorts:():ClearPortsAction => {
    return {
      type: ConnectionAction.CLEAR_PORTS
    }
  },

  connect:(port:string, baudrate:number):ConnectAction => {
    return {
      type: ConnectionAction.CONNECT,
      payload: {
        port,
        baudrate,
        status: ConnectionStatus.connecting
      }
    }
  },

  connected:():ConnectedAction => {
    return {
      type: ConnectionAction.CONNECTED,
      payload: ConnectionStatus.connected
    }
  },

  disconnect:():DisconnectAction => {
    return {
      type: ConnectionAction.DISCONNECT,
      payload: ConnectionStatus.disconnected
    }
  },

  send:(payload:string):SendAction => {
    return {
      type: ConnectionAction.SEND,
      payload
    }
  },

  sent:(payload:string):SentAction => {
    return {
      type: ConnectionAction.SENT,
      payload
    }
  },

  received:(payload:string):ReceivedAction => {
    return {
      type: ConnectionAction.RECEIVED,
      payload
    }
  },

  clear:():ClearAction => {
    return {
      type: ConnectionAction.CLEAR
    }
  },

  port:(payload:string):PortAction => {
    return {
      type: ConnectionAction.PORT,
      payload
    }
  },

  baud:(payload:number):BaudAction => {
    return {
      type: ConnectionAction.BAUD,
      payload
    }
  }
}
