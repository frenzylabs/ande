//
//  launch.js
//  matter
// 
//  Created by Wess Cope (me@wess.io) on 03/24/20
//  Copyright 2019 Wess Cope
//

const path          = require('path')
const url           = require('url')
const isDev         = require("electron-is-dev")
const WindowState   = require('electron-window-state')
const {autoUpdater} = require('electron-updater')

const { 
  ipcMain,
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

  var window = new BrowserWindow({
    x:          windowState.x,
    y:          windowState.y,
    width:      windowState.width,
    height:     windowState.height,
    minWidth:   760,
    minHeight:  600,
    title:      "Ande",
    webPreferences: {
      nodeIntegration:  true,
      preload:          'preload.js',
      webviewTag:       true
    }
  })

  
  if(isDev) {
    window.webContents.openDevTools()
  }

  window.loadURL(
  isDev
    ? "http://localhost:1234"
    : url.format({
      pathname: path.join(__dirname, "dist", "index.html"),
      protocol: 'file:',
      slashes: true
    })
  )

  window.webContents.session.clearCache()

  windowState.manage(window)

  window.on('page-title-updated', (e) => e.preventDefault())
  window.on('closed', () => window = null)

  window.on('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify()
    window.show()
  })

  autoUpdater.on('update-available', () => window.webContents.send('update-available'))
  autoUpdater.on('update-downloaded', () => window.webContents.send('update-downloaded'))
}

ipcMain.on('install-update', () => {
  autoUpdater.quitAndInstall()
})

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
