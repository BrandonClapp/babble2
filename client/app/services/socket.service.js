(() => {
    'use strict'
    angular.module('babble').factory('socket', ['$timeout', '$rootScope', function($timeout, $rootScope) {
        var socket = null;
        var prefix = 'socket:';
        var dataHost = 'http://localhost:9000/'

        var asyncAngularify = function(socket, callback) {
            return callback ? function() {
                var args = arguments;
                $timeout(function() {
                    callback.apply(socket, args);
                }, 0);
            } : angular.noop;
        };

        function on(evt, callback) {
            socket.on(evt, callback.__ng = asyncAngularify(socket, callback));
        }

        function emit(evt, data, callback) {
            var lastIndex = arguments.length - 1;
            var callback = arguments[lastIndex];
            if (typeof callback == 'function') {
                callback = asyncAngularify(socket, callback);
                arguments[lastIndex] = callback;
            }
            return socket.emit.apply(socket, arguments);
        }

        function removeListener (ev, fn) {
            if (fn && fn.__ng) {
              arguments[1] = fn.__ng;
            }
            return socket.removeListener.apply(socket, arguments);
          }

        function forward (events, scope) {
            if (events instanceof Array === false) {
              events = [events];
            }
            if (!scope) {
              scope = defaultScope;
            }
            events.forEach(function (eventName) {
              var prefixedEvent = prefix + eventName;
              var forwardBroadcast = asyncAngularify(socket, function () {
                Array.prototype.unshift.call(arguments, prefixedEvent);
                scope.$broadcast.apply(scope, arguments);
              });
              scope.$on('$destroy', function () {
                socket.removeListener(eventName, forwardBroadcast);
              });
              socket.on(eventName, forwardBroadcast);
            });
          }



        function load(io, config) {
            // todo clean this up
            // if there is a socket
            if(socket) {
                // see if it's connected
                console.log('there is a socket')
                if(!socket.connected) {
                    // if not, connect it.
                    console.log('it is not connected, attempting to connect');
                    socket = io.connect('http://' + config.host + ':' + config.port);
                } else {
                    // do nothing
                    console.log('it is already connected, returning');
                    return;
                }

            } else {
                // there is not a socket
                console.log('there is not a socket, attempting to connect');
                socket = io.connect('http://' + config.host + ':' + config.port);
            }
        }

        function checkConnection() {
            return socket ? socket.connected : false;
        }

        return {
            on: on,
            emit: emit,
            load: load,
            forward: forward,
            connected: checkConnection
        }
    }]);
})();
