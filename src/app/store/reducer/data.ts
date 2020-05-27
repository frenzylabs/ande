//
//  data.ts
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/21/20
//  Copyright 2020 Wess Cope
//

import {Reducer}          from 'redux'
import Datastore          from '../../data'

import {
  DataAction,
  DataActionType
} from '../action/data'

export interface DataState {
  macros:Array<object>
  commandHistory: Array<string>
}

const initialState = {
  macros:         [],
  commandHistory: Datastore.get('commandHistory', [])
}

const reducer:Reducer = (state:DataState = initialState, action:DataActionType):DataState => {
  switch(action.type) {
    case DataAction.LOAD_MACROS:
      return {
        ...state,
        macros: action.payload || []
      }

    case DataAction.HISTORY_ADD:
      return {
        ...state,
        commandHistory: [action.payload].concat(state.commandHistory)
      }

    case DataAction.HISTORY_CLEAR:
      return {
        ...state,
        commandHistory: []
      }

    default: return state
  }
}

export default reducer
