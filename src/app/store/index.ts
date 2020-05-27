//
//  index.ts
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/04/20
//  Copyright 2020 Wess Cope
//

import {
  createStore,
  applyMiddleware
}  from 'redux'

import RootReducer from './reducer'

import {
  Persistance
} from './middleware'

if(!globalThis.store) {
  globalThis.ReduxStore = createStore(
    RootReducer,
    applyMiddleware(Persistance)
  )
}
export default globalThis.ReduxStore
