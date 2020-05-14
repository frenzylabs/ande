//
//  types.ts
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/04/20
//  Copyright 2020 Wess Cope
//

import {ConnectionStatus} from '../../connection'

export enum ActionIdentifier {
  LIST          = "ACTION.LIST",
  CONNECT       = "ACTION.CONNECT",
  CONNECTED     = "ACTION.CONNECTED",
  DISCONNECT    = "ACTION.DISCONNECT",
  SEND          = "ACTION.SEND",
  SENT          = "ACTION.SENT",
  RECEIVED      = "ACTION.RECEIVED",
  PORT          = "ACTION.PORT",
  BAUD          = "ACTION.BAUD",
  CLEAR         = "ACTION.CLEAR",
  CONTROLS      = "ACTION.CONTROLS",
  LOAD_MACROS   = "ACTION.LOAD_MACROS",
}

export interface ListAction {
  type: ActionIdentifier.LIST
  payload: Array<string>
}

export interface ConnectAction {
  type: ActionIdentifier.CONNECT
  payload: {
    port:string,
    baudrate:number,
    status:ConnectionStatus.connecting
  }
}

export interface ConnectedAction {
  type: ActionIdentifier.CONNECTED
  payload: ConnectionStatus.connected

}

export interface DisconnectAction {
  type: ActionIdentifier.DISCONNECT
  payload: ConnectionStatus.disconnected

}

export interface SendAction {
  type: ActionIdentifier.SEND
  payload: string
}

export interface SentAction {
  type: ActionIdentifier.SENT
  payload: string
}

export interface ReceivedAction {
  type: ActionIdentifier.RECEIVED
  payload: string
}

export interface PortAction {
  type: ActionIdentifier.PORT
  payload:string
}

export interface BaudAction {
  type:ActionIdentifier.BAUD
  payload:number
}

export interface ClearAction {
  type: ActionIdentifier.CLEAR
}

export interface ControlsAction {
  type: ActionIdentifier.CONTROLS
}

export interface LoadMacrosAction {
  type: ActionIdentifier.LOAD_MACROS
  payload:Array<object>

}

type ActionType =
  | ListAction
  | ConnectAction
  | ConnectedAction
  | DisconnectAction
  | SendAction
  | SentAction
  | ReceivedAction
  | PortAction
  | BaudAction
  | ClearAction
  | ControlsAction
  | LoadMacrosAction

export default ActionType
