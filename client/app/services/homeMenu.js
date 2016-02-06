(function() {
  'use strict'

  function display() {
    var remote = require('remote');
    var Menu = remote.require('menu');
    var MenuItem = remote.require('menu-item');
    var ipc = require('ipc');
    var events = require(__base + 'app/services/events.js');

    var menu = null;

    var template = [
      {
        label: 'Babble',
        submenu: [
          {
            label: 'Quit',
            accelerator: 'CmdOrCtrl+Q',
            click: function() {
                ipc.send('quit');
            }
          },
        ]
      },
      {
        label: 'Connect',
        submenu: [
          {
            label: 'New Connection',
            accelerator: 'CmdOrCtrl+N',
            click: function() {
                events.fire('newConnectionClick');
            }
          },
          {
            label: 'Disconnect',
            click: function() {
                events.fire('disconnectClick');
            }
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

     menu = Menu.buildFromTemplate(template);
     Menu.setApplicationMenu(menu);
  }

  var homeMenu = {
    display: display
  }

  return module.exports = homeMenu;

})();
