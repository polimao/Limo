/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

/* eslint-disable */
var path = require('path')

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

// const { remote } = require('electron')
// const { app } = remote

//   2018 03-06 注释
// var menubar = require('menubar')

// var mb = menubar({
//   dir: path.join(__dirname, '/../menubar'),
//   width: 200,
//   height: 150
//   // alwaysOnTop: true
//   // showOnRightClick: true
// })
// var mb = menubar()

// console.log('dev ----- ')
// mb.on('after-create-window', function ready() {
//   // console.log('--limao---')
//   // console.log(app.getAppPath())
//   // Build default menu for text editing and devtools. (gone since electron 0.25.2)
//   // var menu = Menu.buildFromTemplate(template)
//   // Menu.setApplicationMenu(menu)
// })
// ========== 04-17 农历 menubar

// var mb2 = menubar({
//   dir: path.join(__dirname, '/../menubar/lunar'),
//   width: 540,
//   height: 425
//   // alwaysOnTop: true
//   // showOnRightClick: true
// })
// var mb = menubar()

// console.log('dev ----- ')
// mb2.on('after-create-window', function ready() {
//   // console.log('--limao---')
//   // console.log(app.getAppPath())
//   // Build default menu for text editing and devtools. (gone since electron 0.25.2)
//   // var menu = Menu.buildFromTemplate(template)
//   // Menu.setApplicationMenu(menu)
// })
// console.log(iconPath)
var menubar = require('menubar')
menubar({
  dir: path.join(__dirname, '/../menubar/lunar'),
  width: 540,
  height: 425,
  // icon: iconPath
  // icon: path.join(__dirname, '//../menubar/lunar/', 'panda.png').replace(/\\/g, '\\\\'),
  // alwaysOnTop: true
  // showOnRightClick: true
})

// Require `main` process to boot app
require('./index')