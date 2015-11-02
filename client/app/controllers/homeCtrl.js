(function(homeMenu, tcp, events) {
  'use strict'
  homeMenu.display();

  angular.module('babble').controller('homeCtrl', ['$scope', function($scope) {

    $scope.display = {
      newConnectionOverlay: false
    }

    $scope.onChatSend = function(message){
      tcp.send('chat', message);
    }

    events.on('newConnectionClick', function() {
      $scope.display.newConnectionOverlay = true;
      $scope.$apply();
    });

    events.on('connected', function() {
      $scope.message = 'You\'re connected, yo!\n';
    });

    events.on('chat', function(data){
      $scope.message += data + '\n';
    });

  }])
})(
  require('./../services/homeMenu.js'),
  require('./../services/tcp.js'),
  require('./../services/events.js')
);
