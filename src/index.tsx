//
//  index.tsx
//  Boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 03/24/20
//  Copyright 2019 Wess Cope
//

require('./bootstrap')

import React    from 'react'
import ReactDOM from 'react-dom'

import {
  HashRouter as Router
} from 'react-router-dom'

import App from './app'

ReactDOM.render(
  <Router>
    <App/>
  </Router>,
  document.getElementById('root')
)
