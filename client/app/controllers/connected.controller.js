(function() {
    'use strict'

    // represents the base controller for all connected states
    angular.module('babble').controller('connected.controller', ['$scope', '$state', 'socket', '$ocLazyLoad', function($scope, $state, socket, $ocLazyLoad) {

        console.log('lazy loading socket.io');
        $ocLazyLoad.load('http://localhost:9000/socket.io/socket.io.js');
        console.log('lazy loaded socket.io', io);
        // connect the socket if not already connected.
        socket.load(io); // io exposed from lazy loaded socket.io script.


        // ensure that the socket event handler only gets registered once on (forward/back nagivation).
        socket.forward('news', $scope);
        $scope.$on('socket:news', function (evt, data) {
          console.log('controller event got fired.');
          $scope.news = data;
          socket.emit('my other event', { my: 'data' });
        });

        socket.forward('error', $scope);
        $scope.$on('socket:error', function(evt, error) {
            // console.log('error happened', error);
            if (error.type == "UnauthorizedError" || error.code == "invalid_token") {
              // redirect user to login page perhaps?
              console.log("User's token is invalid (or has expired)");
            }
        });

    }]);
})();
