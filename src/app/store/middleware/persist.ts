//
//  persist.ts
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/20/20
//  Copyright 2020 Wess Cope
//

import Datastore from '../../data'

const persistance =  (store) => (next) => (action) => {

  next(action)

  const state = store.getState()

  Datastore.set({
    connection: {
      port:     state.connection.port,
      baudrate: state.connection.baudrate
    },
    commandHistory: state.data.commandHistory
  })
}

export default persistance
