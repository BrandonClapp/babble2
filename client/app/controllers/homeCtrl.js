(function(){
  'use strict'

  angular.module('babble').controller('homeCtrl',  ['$scope', 'menuSvc', 'authSvc',
    function($scope, menuSvc, authSvc) {
        console.log('loading homeCtrl');


      menuSvc.on('newConnectionClick', function(){
        vex.dialog.open({
          message: 'Enter your username and password:',
          input: "<input name=\"username\" type=\"text\" placeholder=\"Username\" required />\n<input name=\"password\" type=\"password\" placeholder=\"Password\" required />",
          buttons: [
            $.extend({}, vex.dialog.buttons.YES, {
              text: 'Login'
            }), $.extend({}, vex.dialog.buttons.NO, {
              text: 'Back'
            })
          ],
          callback: function(data) {
            if (data === false) {
              return console.log('Cancelled');
            }
            return console.log('Username', data.username, 'Password', data.password);
          }
          });
      });

      $scope.test = '360 no $scope';

      $scope.connect = function(host, port, username, password) {
          authSvc.connect(host, port, username, password);
      }
    }]
 )
})();
