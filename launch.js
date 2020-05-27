//
//  launch.js
//  matter
// 
//  Created by Wess Cope (me@wess.io) on 03/24/20
//  Copyright 2019 Wess Cope
//

const path        = require('path')
const isDev       = require("electron-is-dev")
const WindowState = require('electron-window-state')

const { 
  BrowserWindow, 
  app
} = require('electron')

if(isDev) {
  require('electron-reload')(path.join(__dirname, 'dist'))
}

const createWindow = () => {
  const windowState = WindowState({
    defaultWidth:   1000,
    defaultHeight:  800
  })

  const window = new BrowserWindow({
    x:          windowState.x,
    y:          windowState.y,
    width:      windowState.width,
    height:     windowState.height,
    minWidth:   760,
    minHeight:  600,
    title:      "Hum",
    webPreferences: {
      nodeIntegration:  true,
      preload:          'preload.js'
    }
  })


  if(isDev) {
    window.webContents.openDevTools();
  }

  window.loadURL(
  isDev
    ? "http://localhost:1234"
    : `file://${path.join(__dirname, "dist/index.html")}`
  )

  window.webContents.session.clearCache()

  windowState.manage(window)

  window.on('page-title-updated', (e) => e.preventDefault())
  window.on('ready-to-show', () => window.show())
  window.on('closed', () => window = null)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if(process.platform.toLowerCase().includes('darwin')) {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

