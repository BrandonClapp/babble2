(function(){
  'use strict'

  angular.module('babble').controller('homeCtrl',  ['$scope', 'menuSvc', 'authSvc', 'windowSvc',
    function($scope, menuSvc, authSvc, windowSvc) {
        console.log('loading homeCtrl');

        menuSvc.display();

      menuSvc.on('newConnectionClick', function(){
        windowSvc.open('newConnectionWindow');
      });

      var connect = function(host, port, username, password) {
          authSvc.connect(host, port, username, password);
      }
    }]
 )
})();
