//
//  data.ts
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/21/20
//  Copyright 2020 Wess Cope
//

export enum DataAction {
  LOAD_MACROS   = "ACTION.LOAD_MACROS",
  HISTORY_ADD   = "ACTION.HISTORY_ADD",
  HISTORY_CLEAR = "ACTION.HISTORY_CLEAR"
}

export interface LoadMacrosAction {
  type: DataAction.LOAD_MACROS
  payload:Array<object>
}

export interface HistoryAddAction {
  type: DataAction.HISTORY_ADD
  payload:string
}

export interface HistoryClearAction {
  type: DataAction.HISTORY_CLEAR
}

export type DataActionType =
| LoadMacrosAction
| HistoryAddAction
| HistoryClearAction

export default {
  loadMacros:(payload:Array<object>):LoadMacrosAction => {
    return {
      type: DataAction.LOAD_MACROS,
      payload
    }
  },

  historyAdd:(payload:string):HistoryAddAction => {
    return {
      type: DataAction.HISTORY_ADD,
      payload
    }
  },

  historyClear:():HistoryClearAction => {
    return {
      type: DataAction.HISTORY_CLEAR
    }
  }
}
