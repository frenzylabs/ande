//
//  index.ts
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/21/20
//  Copyright 2020 Wess Cope
//

const {Menu} = window.require('electron').remote

import React        from 'react'
import {withRouter} from 'react-router'
import {connect}    from 'react-redux'
import Component    from '../types/component'

import MenuProvider   from './provider'
import MacroProvider  from '../components/macros/provider'

// Menus
import AppMenu      from './app'
import ConnMenu     from './connection'
import HistoryMenu  from './history'
import RunMenu      from './run'
import EditorMenu   from './editor'
// import HelpMenu     from './help'
import ServicesMenu from './services'

class MainMenu extends Component {
  macroProvider   = MacroProvider

  state = {
    macros: [],
    events: []
  }

  constructor(props:any) {
    super(props)

    this.build    = this.build.bind(this)
    this.runMacro = this.runMacro.bind(this)
  }

  template() {
    return [
      ...AppMenu,
      ...(window.location.pathname == '/macros' ? EditorMenu : []),
      ...ConnMenu(this.props.connection || {}),
      ...HistoryMenu,
      ...RunMenu(this.props.data.macros),
      ...ServicesMenu
      // ...HelpMenu
    ]
  }

  events() {
    const allEvents = (item) => {
      if(item['submenu']) {
        return item.submenu.reduce((acc, curr) => {
          return acc.concat(
            allEvents(curr) || []
          )
        }, [])
      }

      return [item['event']] || null
    }

    this.setState({
      events: this.template().reduce((acc, curr) => acc.concat(allEvents(curr) || []), []).filter(i => typeof i !== 'undefined')
    })
  }

  build() {
    Menu.setApplicationMenu(
      Menu.buildFromTemplate(this.template())
    )

    this.signal.subscribe('menu.preferences', () => {
      this.props.history.push('/settings')
    })

    this.events()
  }

  runMacro(macro) {
    this.macroProvider.run(macro)
  }

  componentDidMount() {
    this.macroProvider.load()

    this.build()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.data.macros !== this.props.data.macros) {
      this.build()
    }
  }

  render() {
    return (
      <MenuProvider events={this.state.events} runMacro={this.runMacro}>
        {this.props.children}
      </MenuProvider>
    )
  }
}

const mapPropsToState = state => {
  return state
}

export default withRouter(connect(mapPropsToState)(MainMenu))
