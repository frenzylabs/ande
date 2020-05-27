//
//  ui.ts
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/21/20
//  Copyright 2020 Wess Cope
//

import {Reducer} from 'redux'

import {
  UIAction,
  UIActionType
} from '../action/ui'

export interface UIState {
  controls:boolean
}

const initialState:UIState = {
  controls: false
}

const reducer:Reducer = (state:UIState = initialState, action:UIActionType):UIState => {
  switch(action.type) {
    case UIAction.CONTROLS:
      return {
        ...state,
        controls: action.payload
      }
  }
}

export default reducer
