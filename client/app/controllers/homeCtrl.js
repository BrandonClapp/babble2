(function(homeMenu, tcp) {
  'use strict'
  homeMenu.display();

  angular.module('babble').controller('homeCtrl', ['$scope', function($scope) {

      $scope.display = {
        newConnectionOverlay: false
      }

      homeMenu.events.newConnectionClick = function() {
        $scope.display.newConnectionOverlay = true;
        $scope.$apply();
      }

      tcp.events.connected = function() {
        $scope.message = 'You\'re connected, yo!';
      }

    }
  ])
})(require('./../services/homeMenu.js'), require('./../services/tcp.js'));
