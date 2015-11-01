(function(homeMenu) {
  'use strict'
  
  homeMenu.display();

  angular.module('babble').controller('homeCtrl', ['$scope', 'authSvc', 'windowSvc',
    function($scope, authSvc, windowSvc) {

      $scope.display = {
        newConnectionOverlay: false
      }

      homeMenu.events.newConnectionClick = function() {
        $scope.display.newConnectionOverlay = true;
        console.log('newConnectionClick from homeCtrl', $scope.display.newConnectionOverlay);
        $scope.$apply();
      }

    }
  ])
})(require('./../services/homeMenu.js'));
