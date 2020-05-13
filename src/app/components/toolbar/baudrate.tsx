//
//  baudrate.tsx
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/01/20
//  Copyright 2020 Wess Cope
//

import React      from 'react'
import {connect}  from 'react-redux'
import Component  from '../../types/component'
import Action     from '../../store/action'

import {
  Select
} from 'antd'

const {Option} = Select

import {Baudrates}        from '../../types'
import {ConnectionStatus} from '../../connection'

class Baudrate extends Component {
  render() {
    return (
      <Select
        disabled={this.props.status != ConnectionStatus.disconnected}
        style={{minWidth: '160px'}}
        showSearch
        placeholder="Select Baudrate..."
        optionFilterProp="children"
        filterOption={(input, option) => 
          option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        onChange={(value) => 
          this.dispatch(
            Action.baud(
              (typeof value === 'string') ? parseInt(value) : value as number
            )
          ) 
        }
      >
        {Baudrates.map((b, i) => 
          <Select.Option key={`baudrate-${i}`} value={b}>{b}</Select.Option>
        )}

      </Select>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.connection.status
  }
}

export default connect(mapStateToProps)(Baudrate)
