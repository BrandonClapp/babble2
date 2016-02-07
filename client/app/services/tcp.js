(function() {
    'use strict'

    var net = require('net');
    var JsonSocket = require('json-socket');
    var events = require('./events.js');

    var socket = null;

    var connect = function(host, port, username, password) {
        return new Promise(function(resolve, reject) {
            disconnect();

            socket = new JsonSocket(new net.Socket());

            socket.connect(port, host);

            socket.on('connect', function() {
                resolve();
                events.fire('connected');
            });

            socket.on('error', function(err) {
                reject(err);
            });

            socket.on('message', function(message) {
                events.fire(message.messageType, message.data);
            });
        });
    }

    var disconnect = function() {
        if (socket && !socket.isClosed()) {
            console.log('ending client socket...');
            socket.sendEndMessage({});
            socket.end();
            socket = null;
        }
    }

    var send = function(messageType, data) {
        socket.sendMessage({
            'messageType': messageType,
            'data': data
        });
    }

    var exports = {
        connect: connect,
        disconnect: disconnect,
        send: send
    }

    module.exports = exports;
})();
