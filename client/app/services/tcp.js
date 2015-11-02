(function(){
  'use strict'

  var net = require('net');
  var JsonSocket = require('json-socket');

  var connect = function(host, port, username, password) {
    return new Promise(function(resolve, reject) {
      let netsocket = new net.Socket();
      let socket = new JsonSocket(new net.Socket());
      socket.connect(port, host);

      socket.on('connect', function() {
          resolve();
          if(exports.events.connected) {
            exports.events.connected();
          }
      });

      socket.on('error', function(err){
        reject(err);
      });
    });
  }

  var exports = {
    connect: connect,
    events: {
      connected: null
    }
  }

  module.exports = exports;
})();
