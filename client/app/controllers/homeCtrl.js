(function(){
  'use strict'

  angular.module('babble').controller('homeCtrl',  ['$scope', 'authSvc', 'windowSvc',
    function($scope, authSvc, windowSvc) {

        console.log('loading homeCtrl');

        var getHomeMenu = function(){

          var display = function() {
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
          return homeMenu;

        }


        var menu = getHomeMenu();
        menu.display();

        $scope.display = {
          newConnectionOverlay: false
        }

        menu.events.newConnectionClick = function(){
          $scope.display.newConnectionOverlay = true;
          console.log('newConnectionClick from homeCtrl', $scope.display.newConnectionOverlay);
          $scope.$apply();
        }

      var connect = function(host, port, username, password) {
          authSvc.connect(host, port, username, password);
      }


    }]
 )


})();
