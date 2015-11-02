(function() {
  'use strict'

  function display() {
    var remote = require('remote');
    var Menu = remote.require('menu');
    var MenuItem = remote.require('menu-item');
    var ipc = require('ipc');

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
                console.log('New connection clicked.');
                if(homeMenu.events.newConnectionClick){
                    homeMenu.events.newConnectionClick();
                }
            }
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

     menu = Menu.buildFromTemplate(template);
     Menu.setApplicationMenu(menu);
  }

  var homeMenu = {
    display: display,
    events: {
      newConnectionClick: null
    }
  }

  module.exports = homeMenu;

})();
