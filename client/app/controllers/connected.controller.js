(function() {
    'use strict'

    // represents the base controller for all connected states
    angular.module('babble').controller('connected.controller', ['$scope', '$state', 'socket', '$ocLazyLoad', 'cache',
    function($scope, $state, socket, $ocLazyLoad, cache) {

        if(!socket.connected()) {
            $state.go('home');
        }
        // connect the socket if not already connected.
         // io exposed from lazy loaded socket.io script.


         $scope.disconnect = function() {
             socket.emit('forceDisconnect');
         }

         socket.on('disconnect', function() {
             console.log('client disconnected');
         });

         socket.on('manual-dc', function() {
             console.log('manual-dc');
             cache.setLastConnectedServer();
             $state.go('home');
         });

        // ensure that the socket event handler only gets registered once on (forward/back nagivation).
        socket.forward('news', $scope);
        $scope.$on('socket:news', function (evt, data) {
          console.log('controller event got fired.');
          $scope.news = data;
          socket.emit('my other event', { my: 'data' });
        });



    }]);
})();
