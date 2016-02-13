(function() {
    'use strict'
    angular.module('babble').controller('home.controller', ['$scope', '$state', '$ocLazyLoad', 'socket', 'cache',
    function($scope, $state, $ocLazyLoad, socket, cache) {

        // todo: see if they have a jwt token
        // if they do and its valid, check claims for server
        // instead of using "lastConnectedServer"

        $scope.showForm = false;

        $scope.connect = function(host, port) {
            if(!cache.ioLoaded) {
                loadScript(host, port);
            } else {
                registerEvents(host, port);
            }
        }

        if(cache.getLastConnectedServer()) {
            console.log('CACHED LAST SERVER EXISTS');
            var lastConnectedServer = cache.getLastConnectedServer();
            $scope.connect(lastConnectedServer.host, lastConnectedServer.port);
        } else {
            console.log('NO LAST CONNECTED SERVER');
            $scope.showForm = true;
        }

        function loadScript(host, port) {
            // console.log('loading the socket.io script');
            $ocLazyLoad.load(getHostUrl(host, port) + '/socket.io/socket.io.js');
        }

        $scope.$on('ocLazyLoad.fileLoaded', function(e, file) {
            if($scope.host && $scope.port) {
                scriptLoaded($scope.host, $scope.port, registerEvents);
            } else if (cache.getLastConnectedServer()) {
                var lastConnected = cache.getLastConnectedServer();
                scriptLoaded(lastConnected.host, lastConnected.port, registerEvents);
            }
        });

        function checkSocketConnection() {
            if(socket.connected()) {
                $state.go('connected');
            }
        }

        function getHostUrl(host, port) {
            return 'http://' + host + ':' + port;
        }

        function scriptLoaded(host, port, cb) {
            cache.ioLoaded = true;
            cb(host, port);
        }

        function registerEvents(host, port) {
            socket.load(io, { // io is lazy loaded.
                host: host,
                port: port
            });

            socket.forward('error', $scope);
            $scope.$on('socket:error', function(evt, error) {
                if (error.type == "UnauthorizedError" || error.code == "invalid_token") {
                    // redirect user to login page perhaps?
                    console.log("User's token is invalid (or has expired)");
                    $scope.error = "User's token is invalid (or has expired)";
                    $scope.showForm = true;
                }
            });

            socket.on('connect', function() {
                cache.setLastConnectedServer({ host: host, port, port });
                $state.go('connected');
            });

            socket.on('disconnect', function() {
                console.log('disconnected');
            });
        }
    }]);
})();
