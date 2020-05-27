//
//  reducer.ts
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/04/20
//  Copyright 2020 Wess Cope
//

import {combineReducers} from 'redux'

import Connection from './connection'
import Data from './data'

export default combineReducers({
  connection: Connection,
  data:       Data
})
