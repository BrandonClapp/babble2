(function() {
    'use strict'
    angular.module('babble').controller('home.controller', ['$scope', '$state', '$ocLazyLoad', 'socket', 'cache',
    function($scope, $state, $ocLazyLoad, socket, cache) {

        $scope.connect = function(host, port) {
            console.log('lazy loading socket.io');
            console.log('loaded', cache.ioLoaded);

            if(!cache.ioLoaded) {
                $ocLazyLoad.load('http://' + host + ':' + port + '/socket.io/socket.io.js');

                $scope.$on('ocLazyLoad.fileLoaded', function(e, file) {
                    console.log('module loaded', file);
                    scriptLoaded(host, port);
                });
            } else {
                console.log('script already been loaded.');
                checkSocketConnection();
            }
        }

        function checkSocketConnection() {
            if(socket.connected()) {
                console.log('CONNECTED');
                $state.go('connected');
            } else {
                console.log('NOT CONNECTED.')
            }
        }

        function scriptLoaded(host, port) {
            cache.ioLoaded = true;

            socket.load(io, { // io is lazy loaded.
                host: host,
                port: port
            });

            socket.forward('error', $scope);
            $scope.$on('socket:error', function(evt, error) {
                // console.log('error happened', error);
                if (error.type == "UnauthorizedError" || error.code == "invalid_token") {
                    // redirect user to login page perhaps?
                    console.log("User's token is invalid (or has expired)");
                    $scope.error = "User's token is invalid (or has expired)";
                }
            });

            socket.on('connect', function() {
                $state.go('connected');
            });

            socket.on('disconnect', function() {
                console.log('disconnected');
            });
        }

    }]);
})();
