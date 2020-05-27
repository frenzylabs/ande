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

import Icon, {IconComponent}  from '../../icon'
import {ConnectionStatus}     from '../../connection'

class Ports extends Component {
  loading = false

  state = {
    portsOpen: false,
    selected: null
  }
  constructor(props:any) {
    super(props)

    this.refreshAction = this.refreshAction.bind(this)
  }

  refreshAction(e) {
    this.loading = true

    this.setState({
      portsOpen: false
    })

    this.dispatch(
      Action.connection.clearPorts()
    )

    return
  }

  componentDidUpdate() {
    this.loading = false
  }

  renderOption(opt, idx) {
    return (
      <Option value={opt.path} key={idx}>{opt.path}</Option>
    )
  }

  render() {
    const selVal = this.state.selected == null ? {} : {value: this.state.selected}

    return (
      <div id="ports-select">
        <div>
          <Select
            {...selVal}
            disabled={this.props.status != ConnectionStatus.disconnected || this.loading}
            loading={this.loading}
            placeholder="Select a port..."
            optionFilterProp="children"
            open={this.state.portsOpen}
            onFocus={() => this.setState({portsOpen: true})}
            onBlur={() => this.setState({portsOpen: false})}
            onChange={(value) => {
              if(!value) { return }

                this.setState({
                  portsOpen: false
                }, () => 
                  this.dispatch(
                    Action.connection.port(value.toString())
                  )
                )
              }
            }
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
          {this.props.ports.map(this.renderOption)}
        </Select>
        </div>
      </div>
    )
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      selected: nextProps.port
    }
  }

}

const mapStateToProps = (state) => {
  return state.connection
}

export default connect(mapStateToProps)(Ports)
