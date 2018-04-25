'use strict'

import { app, BrowserWindow } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.g itbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\')
}

let mainWindow
const winURL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
    // transparent: true,
    // frame: false
  })

  mainWindow.loadURL(winURL)
  mainWindow.isMenuBarVisible(true)
  // Menu.setApplicationMenu(null)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

/** 农历 */
var path = require('path')
var menubar = require('menubar')
menubar({
  dir: path.join(__static, '/menubar/lunar'),
  width: 540,
  height: 425,
  icon: path.join(__static, '/cat.png'),
  showDockIcon: true
  // alwaysOnTop: true
  // showOnRightClick: true
})

/** Host 管理 */
menubar({
  dir: path.join(__dirname, '/../menubar'),
  width: 180,
  height: 170,
  // alwaysOnTop: true,
  showDockIcon: true,
  icon: path.join(__static, '/cat.png')
  // icon: path.join(app.getAppPath(), '/../renderer/menubar/cat.png')
  // showOnRightClick: true
})

// mb.on('ready', function ready() {
//   mb.window.openDevTools()
//   mb.window.loadUrl('/')
// })
