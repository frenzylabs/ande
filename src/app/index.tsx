//
//  index.tsx
//  Boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 03/24/20
//  Copyright 2019 Wess Cope
//

import React      from 'react'
import {Provider} from 'react-redux'
import store      from './store'
import Data       from './data'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import {
  Toolbar,
  Nav,
  Terminal,
  Macros
} from './components'

import Connection from './connection'

globalThis.ReduxDispatch  = store.dispatch
globalThis.data           = new Data()

export default class extends React.Component {
  render() {
    return ( 
      <Provider store={store}>
        <Router>
          <Connection>
            <main>
              <Toolbar/>
              <section id="main-content">
                <Nav/>
                <Switch>
                  <Route exact path="/" component={Terminal}/>
                  <Route exact path="/macros" component={Macros}/>
                </Switch>
              </section>
              
            </main>
          </Connection>
        </Router>
      </Provider>
    )
  }
}
