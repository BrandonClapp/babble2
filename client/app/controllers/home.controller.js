(function() {
    'use strict'
    angular.module('babble').controller('home.controller', ['$scope', '$state', '$ocLazyLoad', 'socket', 'cache', '$http',
    function($scope, $state, $ocLazyLoad, socket, cache, $http) {

        $scope.showForm = false;

        // if they have a token, attempt to connect with it.
        function init() {
            if(cache.getToken()) {
                console.log('Had token in cache. Trying to connect with it.')
                var token = cache.getToken();
                var lastConnectedServer = cache.getLastConnectedServer();
                $scope.connect(lastConnectedServer.host, lastConnectedServer.port, null, token);
            } else {
                // else show the form
                console.log('No token in cache.')
                $scope.showForm = true;
            }
        }

        $scope.connect = function(host, port, creds, token) {
            console.log('creds', creds);
            $http.post('http://' + host + ':' + port + '/authenticate', {
                username: creds ? creds.username : null,
                password: creds ? creds.password : null,
                token: token
            })
            .then(
                function(resp) {
                    cache.setToken(resp.data);
                    !cache.ioLoaded ? loadScript(host, port) : registerEvents(host, port, cache.getToken());
                },
                function(err) {
                    console.log('failed to authenticate.', err);
                }
            );
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

        function getHostUrl(host, port) {
            return 'http://' + host + ':' + port;
        }

        function scriptLoaded(host, port, cb) {
            cache.ioLoaded = true;
            cb(host, port, cache.getToken());
        }

        function registerEvents(host, port, token) {
            socket.load(io, { // io is lazy loaded.
                host: host,
                port: port,
                token: token
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

        init();
    }]);
})();
