(() => {
    'use strict'
    var app = require('express')();
    var server = require('http').Server(app);
    var io = require('socket.io')(server);
    var socketioJwt = require('socketio-jwt');
    var _ = require('lodash-node');

    server.listen(9000);

    // app.get('/', function (req, res) {
    //   res.sendfile(__dirname + '/index.html');
    // });

    // testing
    var connectedSockets = [];
    var counter = 0;
    setInterval(() => {
        counter++;
        for(var i = 0; i < connectedSockets.length; i++) {
            console.log('emitting ' + counter + ' to ' + i);
            connectedSockets[i].emit('news', counter);
        }
    }, 1000);
    //////////

    // io.use(socketioJwt.authorize({
    //   secret: 'your secret or public key',
    //   handshake: true
    // }));

    io.on('connection', function (socket) {
        console.log('User connected.');
        connectedSockets.push(socket);

        var time = new Date().getTime();
        console.log(time);
        socket.emit('news', time);

      socket.on('my other event', function (data) {
        console.log(data);
      });

      socket.on('disconnect', function () {
          console.log('Socket disconnected: ' + socket.id);
          _.remove(connectedSockets, (conSock) => {
              return conSock.id === socket.id;
          });
      });
    });


})();
