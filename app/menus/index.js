'use strict'

var remote = require('remote');
var Menu = remote.require('menu');
var MenuItem = remote.require('menu-item');

module.exports = {
  display: display
}

var menu = null;

var template = [
  {
    label: 'Babble',
    submenu: [
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click: function() { app.quit(); }
      },
    ]
  },
  {
    label: 'Connect',
    submenu: [
      {
        label: 'New Connection',
        accelerator: 'CmdOrCtrl+N'
      },
      {
        label: 'Disconnect'
      }
    ]
  },
  {
    label: 'Debug',
    submenu: [
      {
        label: 'Toggle Developer Tools',
        accelerator: (function() {
          if (process.platform == 'darwin')
            return 'Alt+Command+I';
          else
            return 'Ctrl+Shift+I';
        })(),
        click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.toggleDevTools();
        }
      }
    ]
  }
];

function display(){
  menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
