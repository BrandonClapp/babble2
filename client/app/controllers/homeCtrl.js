(function(homeMenu) {
  'use strict'

  angular.module('babble').controller('homeCtrl', ['$scope', 'authSvc', 'windowSvc',
    function($scope, authSvc, windowSvc) {

      console.log('loading homeCtrl');

      homeMenu.display();

      $scope.display = {
        newConnectionOverlay: false
      }

      homeMenu.events.newConnectionClick = function() {
        $scope.display.newConnectionOverlay = true;
        console.log('newConnectionClick from homeCtrl', $scope.display.newConnectionOverlay);
        $scope.$apply();
      }

      var connect = function(host, port, username, password) {
        authSvc.connect(host, port, username, password);
      }


    }
  ])
})(require('./../services/homeMenu.js'));
