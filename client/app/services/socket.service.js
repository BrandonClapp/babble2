((io) => {
    'use strict'
    angular.module('babble').factory('socket', [function() {
        var socket = null;

        var handlers = [];

        function on(evt, cb) {
            socket.on(evt, cb);
        }

        function emit(evt, data) {
            socket.emit(evt, data);
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
