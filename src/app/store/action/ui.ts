//
//  ui.ts
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/21/20
//  Copyright 2020 Wess Cope
//

///// NOT USED

export enum UIAction {
  CONTROLS = "ACTION.CONTROLS",
}

export interface ControlsAction {
  type: UIAction.CONTROLS,
  payload: boolean
}

export type UIActionType = 
  | ControlsAction

export default {
  controls:(payload:boolean):ControlsAction => {
    return {
      type: UIAction.CONTROLS,
      payload
    }
  } 
}
