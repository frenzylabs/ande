//
//  index.tsx
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/11/20
//  Copyright 2020 Wess Cope
//

const app  = window.require('electron').remote.app

import React      from 'react'
import Component  from '../../types/component'
import Spacer     from '../spacer'
import Option     from './option'


import {
  NavLink,
  withRouter
} from 'react-router-dom'

import {
  Row,
  Col
} from 'antd'

import Icon, {IconComponent} from '../../icon'

import Octologo from '../../images/octoprint.png'

class Nav extends Component {
  options = [
    {
      icon: Icon.terminal,
      path: ''
    },
    {
      icon: Icon.stream,
      path: 'macros'
    }
  ]

  renderSettings() {
    return (
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
    )
  }

  renderOctoprint() {
    return (
      <Row style={{width: '100%'}}>
        <Col flex={1}>
          <NavLink
            className="option"
            activeClassName="current"
            to='/octoprint'
            exact
        >
            <img src={Octologo} width={24} style={{margin: 0, padding: 0}}/>
          </NavLink>
        </Col>
        </Row>
    )
  }

  renderDivider() {
    return (
      <div style={{
        height: '2px', 
        width: '100%',
        borderTop: '1px solid rgba(0, 0, 0, 1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}/>
    )
  }
  
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

        {this.renderOctoprint()}

        <br/>
      </nav>
    )
  }
}

export default withRouter(Nav)
