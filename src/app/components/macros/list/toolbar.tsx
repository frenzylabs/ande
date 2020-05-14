//
//  toolbar.tsx
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/12/20
//  Copyright 2020 Wess Cope
//

import React      from 'react'
import Component  from '../../../types/component'

import Icon, {IconComponent} from '../../../icon'

export default class extends Component {
  render() {
    return (
      <div id="list-toolbar">
        <h3>Macros</h3>

        <div>
          <a onClick={this.props.create}><IconComponent icon={Icon.filePlus}/></a>
          <a onClick={this.props.refresh}><IconComponent icon={Icon.sync}/></a>
        </div>
      </div>
    )
  }
}
