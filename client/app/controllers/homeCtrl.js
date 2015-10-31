(function(){
  'use strict'

  angular.module('babble').controller('homeCtrl',  ['$scope', 'menuSvc', 'authSvc',
    function($scope, menuSvc, authSvc) {
        console.log('loading homeCtrl');


      menuSvc.on('newConnectionClick', function(){
        vex.dialog.open({
          message: 'New Connection',
          input: "<input name=\"host\" type=\"text\" placeholder=\"Host\" value=\"127.0.0.1\" required />\n<input name=\"port\" type=\"text\" placeholder=\"Port\" value=\"8888\" required />\n<input name=\"username\" type=\"text\" placeholder=\"Username\" />\n<input name=\"password\" type=\"password\" placeholder=\"Password\" />\n",
          buttons: [
            $.extend({}, vex.dialog.buttons.YES, {
              text: 'Connect'
            }), $.extend({}, vex.dialog.buttons.NO, {
              text: 'Back'
            })
          ],
          callback: function(data) {
            if (data === false) {
              return console.log('Cancelled');
            }
            connect(data.host, data.port, data.username, data.password);
          }
          });
      });

      var connect = function(host, port, username, password) {
          authSvc.connect(host, port, username, password);
      }
    }]
 )
})();
