//
//  launch.js
//  matter
// 
//  Created by Wess Cope (me@wess.io) on 03/24/20
//  Copyright 2019 Wess Cope
//

const path  = require('path')
const isDev = require("electron-is-dev");

const { 
  BrowserWindow, 
  app
} = require('electron')

if(isDev) {
  require('electron-reload')(path.join(__dirname, 'dist'))
}

const createWindow = () => {
  const window = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
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

  window.on('ready-to-show', () => window.show())
}

app.on('ready', createWindow)

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
