//////////////////////////////////////////////////////////
//
//  Base controller while a user has yet to connect.
//
//////////////////////////////////////////////////////////
(function(_, homeMenu, http, tcp, events, recorder) {
  'use strict'
  homeMenu.display();

  angular.module('babble').controller('homeCtrl', ['$scope', function($scope) {

    // scope declarations
    $scope.channels = [];
    $scope.messages = [];
    $scope.connected = false;

    var me = null;
    //var tempChannel = null;

    $scope.display = {
      newConnectionOverlay: false
    }

    $scope.onChatSend = function(message){
      tcp.send('chat', message);
      $scope.message = '';
    }

    $scope.onChannelJoin = function(channel){
      //tempChannel = me.channelId;
      //console.log('tempChannel', tempChannel);
      tcp.send('userJoinChannelRequest', channel.id);
    }

    events.on('newConnectionClick', function() {
      $scope.display.newConnectionOverlay = true;
      $scope.$apply();
    });

    events.on('disconnectClick', function () {
      tcp.disconnect();
      $scope.connected = false;
      $scope.messages = [];
      $scope.channels = [];
      $scope.$apply();
    });

    events.on('connected', function() {
      $scope.message = 'I\'m connected, yo!\n';
      $scope.connected = true;
      $scope.$apply();

      http.send('getAllChannelsRequest');
      //tcp.send('getAllChannelsRequest');
    });

    events.on('credentialResponse', function(user){
      me = user;
    });

    events.on('getAllChannelsResponse', function(data){
      console.log('all channels', data);
      $scope.channels = data;
      $scope.$apply();
    });

    events.on('userJoinChannelResponse', function(user) {
      _.each($scope.channels, function (channel) {
    		_.remove(channel.users, {connectionId: user.connectionId})
    	});

      var newChannel = _.find($scope.channels, function(channel) {
        return channel.id === user.channelId;
      });

      newChannel.users.push(user);
      //recorder.startListening();
      $scope.$apply();
    });

    events.on('chat', function(data){
      $scope.messages.push(data);
      $scope.$apply();
      $('#activities').scrollTop(1000000);
    });

  }])
})(
  _,
  require('./../services/homeMenu.js'),
  require('./../services/http.js'),
  require('./../services/tcp.js'),
  require('./../services/events.js'),
  require('./../services/recorder.js')
);
