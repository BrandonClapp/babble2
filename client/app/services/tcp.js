'use strict'

var net = require('net');
var JsonSocket = require('json-socket');

var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var connect = function(host, port, username, password) {
  return new Promise(function(resolve, reject) {
    var netsocket = new net.Socket();
    var socket = new JsonSocket(new net.Socket()); //Decorate a standard net.Socket with JsonSocket
    socket.connect(port, host);
    socket.on('connect', function() {
        resolve();
    });

    socket.on('error', function(err){
      reject(err);
    });
  });
}

var exports = {
  connect: connect,
}

module.exports = exports;
