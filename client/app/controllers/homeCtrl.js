(function(homeMenu, tcp) {
  'use strict'
  homeMenu.display();

  angular.module('babble').controller('homeCtrl', ['$scope', 'windowSvc',
    function($scope, windowSvc) {

      $scope.display = {
        newConnectionOverlay: false
      }

      homeMenu.events.newConnectionClick = function() {
        $scope.display.newConnectionOverlay = true;
        $scope.$apply();
      }

      // tcp.events.connected = function() {
      //   console.log('homeCtrl knows that tcp is connected');
      // }
    }
  ])
})(require('./../services/homeMenu.js'), require('./../services/tcp.js'));
