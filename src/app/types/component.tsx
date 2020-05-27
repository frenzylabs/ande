//
//  component.tsx
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/04/20
//  Copyright 2020 Wess Cope
//

import React        from 'react'
import Signal       from '../../libs/signal'
import Store        from '../store'
import UserDefaults from '../data/userdefaults'

export default class extends React.Component<any, any> {
  signal        = Signal
  store         = Store
  dispatch      = Store.dispatch
  userDefaults  = UserDefaults
}
