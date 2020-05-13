//
//  ports.tsx
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

import {ConnectionStatus} from '../../connection'

class Ports extends Component {


  renderOption(opt, idx) {
    return (
      <Option value={opt.path} key={idx}>{opt.path}</Option>
    )
  }

  render() {
    return (
      <Select
        disabled={this.props.status != ConnectionStatus.disconnected}
        style={{minWidth: '200px'}}
        showSearch
        placeholder="Select a port..."
        optionFilterProp="children"
        onChange={(value) => 
          this.dispatch(
            Action.port(value.toString())
          ) 
        }
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {this.props.ports.map(this.renderOption)}
      </Select>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ports: state.ports,
    status: state.connection.status
  }
}

export default connect(mapStateToProps)(Ports)
