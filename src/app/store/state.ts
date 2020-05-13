//
//  state.ts
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/04/20
//  Copyright 2020 Wess Cope
//

import {
  ConnectionStatus
} from '../connection'

export interface State {
  controls:boolean
  ports:Array<string>
  connection: {
    port:string,
    baudrate:number
    status:ConnectionStatus
  }
  macros:Array<object>,
  buffer:Array<string>,
  outgoing:Array<string>
}

export const initialState:State = {
  controls:   false,
  ports:      [],
  connection: {
    port:     null,
    baudrate: null,
    status:   ConnectionStatus.disconnected
  },
  macros:     [],
  buffer:     [],
  outgoing:   []
}
