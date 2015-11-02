(function(homeMenu) {
  'use strict'

  var tcp = require('./../services/tcp.js');

  homeMenu.display();

  angular.module('babble').controller('homeCtrl', ['$scope', 'authSvc', 'windowSvc',
    function($scope, authSvc, windowSvc) {

      $scope.display = {
        newConnectionOverlay: false
      }

      homeMenu.events.newConnectionClick = function() {
        $scope.display.newConnectionOverlay = true;
        $scope.$apply();
      }

      tcp.events.connected = function() {
        console.log('homeCtrl knows that tcp is connected');
      }
    }
  ])
})(require('./../services/homeMenu.js'));
