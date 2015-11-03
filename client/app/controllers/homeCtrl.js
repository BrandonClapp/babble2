(function(homeMenu, tcp, events) {
  'use strict'
  homeMenu.display();

  angular.module('babble').controller('homeCtrl', ['$scope', function($scope) {

    $scope.display = {
      newConnectionOverlay: false
    }

    $scope.onChatSend = function(message){
      tcp.send('chat', message);
      $scope.message = '';
    }

    events.on('newConnectionClick', function() {
      $scope.display.newConnectionOverlay = true;
      $scope.$apply();
    });

    $scope.connected = false;
    events.on('connected', function() {
      $scope.message = 'I\'m connected, yo!\n';
      $scope.connected = true;
      $scope.$apply();

      tcp.send('getAllChannelsRequest');
    });

    events.on('getAllChannelsResponse', function(data){
      $scope.channels = data;
      $scope.$apply();
    });

    $scope.messages = [];
    events.on('chat', function(data){
      $scope.messages.push(data);
      $scope.$apply();
    });

  }])
})(
  require('./../services/homeMenu.js'),
  require('./../services/tcp.js'),
  require('./../services/events.js')
);
