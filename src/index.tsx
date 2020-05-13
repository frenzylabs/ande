//
//  index.tsx
//  Boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 03/24/20
//  Copyright 2019 Wess Cope
//

import React    from 'react'
import ReactDOM from 'react-dom'

import { library }  from '@fortawesome/fontawesome-svg-core'
import { fas }      from '@fortawesome/free-solid-svg-icons'
import { fad }      from '@fortawesome/pro-duotone-svg-icons'
import { fal }      from '@fortawesome/pro-light-svg-icons'
import { fab }      from '@fortawesome/free-brands-svg-icons'
import { far }      from '@fortawesome/pro-regular-svg-icons'

library.add(fas, fad, fal, fab, far)

import App from './app'

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
