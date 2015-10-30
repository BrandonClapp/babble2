(function(){
  'use strict'

  angular.module('babble').controller('homeCtrl',  ['$scope', 'menuSvc', 'authSvc',
    function($scope, menuSvc, authSvc) {
        console.log('loading homeCtrl');
      

      menuSvc.on('newConnectionClick', function(){
          alert('new window');
      });

      $scope.test = '360 no $scope';

      $scope.connect = function(host, port, username, password) {
          authSvc.connect(host, port, username, password);
      }
    }]
 )
})();
