((io) => {
    'use strict'
    angular.module('babble').factory('socket', ['$timeout', function($timeout) {
        var socket = null;

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
            if(typeof callback == 'function') {
              callback = asyncAngularify(socket, callback);
              arguments[lastIndex] = callback;
            }
            return socket.emit.apply(socket, arguments);
          }

        function load() {
            var sock = socket || io.connect('http://localhost:9000');
            socket = sock;
        }

        return {
            on: on,
            emit: emit,
            load: load
        }
    }]);
})(io);
