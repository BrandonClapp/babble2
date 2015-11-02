'use strict'



var connect = function(host, port) {
  var net = require('net');
  var JsonSocket = require('json-socket');

  var readline = require('readline');
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout

  });

  var port = port; //The same port that the server is listening on
  var host = host;
  var netsocket = new net.Socket();
  var socket = new JsonSocket(new net.Socket()); //Decorate a standard net.Socket with JsonSocket
  socket.connect(port, host);
  socket.on('connect', function() { //Don't send until we're connected
      if(exports.events.connected) {
        exports.events.connected();
      }

      console.log('client is connected');
      socket.sendMessage({messageType: 'chat', data: 'Go go go fire in the hole!'});

      socket.on('message', function(message) {
          console.log('Server says: ' + JSON.stringify(message));
      });

      rl.on('line', function (line) {
          if (line == 'exit' || line == 'end' || line == 'close') {
              rl.close();
              socket.end();
          }
          else {
              socket.sendMessage({messageType: 'chat', data: line});
          }
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
