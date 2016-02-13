((io) => {
    'use strict'
    angular.module('babble').factory('socket', ['$timeout', '$rootScope', function($timeout, $rootScope) {
        var socket = null;
        var prefix = 'socket:';

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

        function load() {
            var sock = socket || io.connect('http://localhost:9000');
            socket = sock;
        }

        return {
            on: on,
            emit: emit,
            load: load,
            forward: forward
        }
    }]);
})(io);
