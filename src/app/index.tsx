//
//  index.tsx
//  Boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 03/24/20
//  Copyright 2019 Wess Cope
//

import React      from 'react'
import {Provider} from 'react-redux'
import Store      from './store'

import {
  Switch,
  Route,
  withRouter
} from 'react-router-dom'

import {
  Toolbar,
  Nav,
  Terminal,
  Macros,
  Settings
} from './components'

import AppRoute   from './routes'
import Menu       from './menu'
import Connection from './connection'

Object.assign(globalThis, {
  ReduxStore:     Store,
  ReduxDispatch:  Store.dispatch
})

class App extends React.Component<any> {
  constructor(props:any) {
    super(props)
  }

  renderSettings(withBackground:boolean = false) {
    if(!withBackground) { return }

    return (
      <Route exact path={AppRoute.Settings} component={Settings}/>
    )
  }
  render() {
    const location    = this.props.location
    const background  = location.state && location.state.background


    return ( 
      <Provider store={Store}>
        <Menu>
          <Connection>
            <main>

              <Toolbar/>
              <section id="main-content">
                <Nav/>
                <Switch location={background || location}>
                  <Route exact path={AppRoute.Root}   component={Terminal}/>
                  <Route exact path={AppRoute.Macros} component={Macros}/>
                </Switch>

                {this.renderSettings(background)}
              </section>

            </main>
          </Connection>
        </Menu>
      </Provider>
    )
  }
}

export default withRouter(App)
