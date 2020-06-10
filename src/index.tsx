//
//  index.tsx
//  Boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 03/24/20
//  Copyright 2019 Wess Cope
//

import React    from 'react'
import ReactDOM from 'react-dom'

import {
  HashRouter as Router
} from 'react-router-dom'

import { library }  from '@fortawesome/fontawesome-svg-core'
import { fas }      from '@fortawesome/free-solid-svg-icons'
import { fab }      from '@fortawesome/free-brands-svg-icons'

library.add(fas, fab)

import App from './app'

ReactDOM.render(
  <Router>
    <App/>
  </Router>,
  document.getElementById('root')
)
