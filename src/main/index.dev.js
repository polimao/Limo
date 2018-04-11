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
require('electron-debug')({ showDevTools: false })

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
// var menubar = require('menubar')

// var mb = menubar()

// console.log('dev ----- ')
// mb.on('ready', function ready() {
//   console.log('--limao---')
//   console.log(app.getAppPath())

//   // Build default menu for text editing and devtools. (gone since electron 0.25.2)
//   // var menu = Menu.buildFromTemplate(template)
//   // Menu.setApplicationMenu(menu)
// })
//   2018 03-06 注释

import { Menu } from 'electron'
// ---------------------------------------------------------------------------------------------------
// 注册常用快捷键，解决 mac 上不能用复制粘贴问题
// const Menu = require("menu");
// Create the Application's main menu
let template = [
  {
    label: 'Application',
    submenu: [
      {
        label: 'About Hosts High',
        click: function() {
          // new BrowserWindow({
          //   parent: BrowserWindow.getFocusedWindow(),
          //   width: 285,
          //   height: 230,
          //   center: true,
          //   resizable: false,
          //   minimizable: false,
          //   maximizable: false,
          //   show: true,
          //   title: ''
          // }).loadURL('file://' + resolve(__dirname, 'about.html'))
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit Hosts High',
        accelerator: 'CmdOrCtrl+Q',
        click: function() {
          app.quit()
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        selector: 'undo:',
        role: 'undo'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        selector: 'redo:',
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        selector: 'cut:',
        role: 'cut'
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        selector: 'copy:',
        role: 'copy'
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        selector: 'paste:',
        role: 'paste'
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        selector: 'selectAll:',
        role: 'selectall'
      }
    ]
  }
]
// 注册菜单
// Menu.setApplicationMenu(Menu.buildFromTemplate(template))
// ---------------------------------------------------------------------------------------------------
