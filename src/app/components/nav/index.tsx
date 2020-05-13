//
//  index.tsx
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/11/20
//  Copyright 2020 Wess Cope
//

import React      from 'react'
import Component  from '../../types/component'
import Spacer     from '../spacer'
import Icon       from '../../icon'
import Option     from './option'

import {
  Link
} from 'react-router-dom'

export default class extends Component {
  options = [
    {
      icon: Icon.terminal,
      path: '/'
    },
    {
      icon: Icon.stream,
      path: '/macros'
    }
  ]

  render() {
    return (
      <nav id="main-nav">
        {this.options.map((option, idx) => 
          <Option 
            key={`nav-option-${idx}`} 
            icon={option.icon}
            path={option.path}
            current={idx == 0  }
          />
        )}

        <Spacer/>

        <Option icon={Icon.cog} path="/settings"/>
      </nav>
    )
  }
}
