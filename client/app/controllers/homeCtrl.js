(function(homeMenu, tcp, events) {
  'use strict'
  homeMenu.display();

  angular.module('babble').controller('homeCtrl', ['$scope', function($scope) {

    $scope.display = {
      newConnectionOverlay: false
    }

    events.on('newConnectionClick', function() {
      $scope.display.newConnectionOverlay = true;
      $scope.$apply();
    });

    events.on('connected', function() {
      $scope.message = 'You\'re connected, yo!';
    });

  }])
})(
  require('./../services/homeMenu.js'),
  require('./../services/tcp.js'),
  require('./../services/events.js')
);
