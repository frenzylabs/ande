//
//  component.tsx
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/04/20
//  Copyright 2020 Wess Cope
//

import React from 'react'
import store from '../store'

export default class extends React.Component<any, any> {
  store     = store
  dispatch  = store.dispatch
  data      = globalThis.Data
}
