(function(){
  'use strict'

  var net = require('net');
  var JsonSocket = require('json-socket');
  var events = require('./../services/events.js');

  var netsocket = new net.Socket();
  var socket = new JsonSocket(new net.Socket());

  var connect = function(host, port, username, password) {
    return new Promise(function(resolve, reject) {

      socket.connect(port, host);

      socket.on('connect', function() {
          resolve();
          events.fire('connected');
      });

      socket.on('error', function(err){
        reject(err);
      });

      socket.on('message', function(message){
        events.fire(message.messageType, message.data);
      });
    });
  }

  var send = function(messageType, data) {
    socket.sendMessage({ 'messageType': messageType, 'data': data });
  }

  var exports = {
    connect: connect,
    send: send
  }

  module.exports = exports;
})();
