//
//  index.tsx
//  Boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 03/24/20
//  Copyright 2019 Wess Cope
//

const {ipcRenderer} = window.require('electron')

import React      from 'react'
import {Provider} from 'react-redux'
import Store      from './store'

import {
  Switch,
  Route,
  withRouter
} from 'react-router-dom'

import {notification} from 'antd'

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

    ipcRenderer.on('update-available', () =>{
      ipcRenderer.removeAllListeners('update-available')

      notification.info({
        message:      "Downloading a new version of Ande",
        placement:    "bottomRight"
      })
    })

    ipcRenderer.on('update-downloaded', () => {
      ipcRenderer.removeAllListeners('update-downloaded')

      notification.info({
        message: (
          <div>
            <p>A new version of Ande is available</p>
            <button onClick={() => ipcRenderer.send('install-update')}>Click to download</button>
          </div>
        ),
        placement: "bottomRight"
      })
    })
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
