/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

/* eslint-disable */

// Set environment for development
process.env.NODE_ENV = 'development'

// Install `electron-debug` with `devtron`
require('electron-debug')({
  showDevTools: false
})

// Install `vue-devtools`
require('electron').app.on('ready', () => {
  let installExtension = require('electron-devtools-installer')
  installExtension
    .default(installExtension.VUEJS_DEVTOOLS)
    .then(() => {})
    .catch(err => {
      console.log('Unable to install `vue-devtools`: \n', err)
    })
})

// Require `main` process to boot app
require('./index')

// const { remote } = require('electron')
// const { app } = remote

//   2018 03-06 注释
var menubar = require('menubar')
var opts = {
  dir: __dirname + '/../menubar',
  width: 200,
  height: 150
  // alwaysOnTop: true
  // showOnRightClick: true
}
var mb = menubar(opts)
// var mb = menubar()

// console.log('dev ----- ')
mb.on('ready', function ready() {
  // console.log('--limao---')
  // console.log(app.getAppPath())
  // Build default menu for text editing and devtools. (gone since electron 0.25.2)
  // var menu = Menu.buildFromTemplate(template)
  // Menu.setApplicationMenu(menu)
})



// ========== 04-17 农历 menubar
var menubar2 = require('menubar')
var opts = {
  dir: __dirname + '/../menubar/lunar',
  width: 540,
  height: 425
  // alwaysOnTop: true
  // showOnRightClick: true
}
var mb2 = menubar2(opts)
// var mb = menubar()

// console.log('dev ----- ')
mb2.on('ready', function ready() {
  // console.log('--limao---')
  // console.log(app.getAppPath())
  // Build default menu for text editing and devtools. (gone since electron 0.25.2)
  // var menu = Menu.buildFromTemplate(template)
  // Menu.setApplicationMenu(menu)
})