//
//  index.ts
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/04/20
//  Copyright 2020 Wess Cope
//

import ConnectionAction, {ConnectionActionType} from './connection'
import DataAction, {DataActionType}             from './data'

export type ActionType = 
  | ConnectionActionType 
  | DataActionType


export default {
  connection: ConnectionAction,
  data:       DataAction
}
