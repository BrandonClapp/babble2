(function(){
  'use strict'

  var net = require('net');
  var JsonSocket = require('json-socket');
  var events = require('./../services/events.js');

  var connect = function(host, port, username, password) {
    return new Promise(function(resolve, reject) {
      let netsocket = new net.Socket();
      let socket = new JsonSocket(new net.Socket());
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

  var exports = {
    connect: connect
  }

  module.exports = exports;
})();
