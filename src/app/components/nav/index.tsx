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
import Option     from './option'

import {
  NavLink,
  withRouter
} from 'react-router-dom'

import Icon, {IconComponent} from '../../icon'

class Nav extends Component {
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

        <NavLink
          className="option"
          to={{
            pathname: '/settings',
            state: {background: this.props.location}
          }}
          exact
        >
          <IconComponent
            icon={Icon.cog}
            style={{fontSize: '16px'}}
            fixedWidth
          />
        </NavLink>
      </nav>
    )
  }
}

export default withRouter(Nav)
