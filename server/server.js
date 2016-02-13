(() => {
    'use strict'
    var app = require('express')();
    var server = require('http').Server(app);
    var io = require('socket.io')(server);
    var socketioJwt = require('socketio-jwt');
    var _ = require('lodash-node');

    server.listen(9000);

    // todo: add logic to disconnect clients after a period of inactivity.
    // todo: add caching for things that should be persisted.

    // app.get('/', function (req, res) {
    //   res.sendfile(__dirname + '/index.html');
    // });

    // testing
    var connectedSockets = [];
    var counter = 0;
    setInterval(() => {
        counter++;
        connectedSockets.forEach((conSock) => {
            //console.log('emitting ' + counter + ' to ' + conSock.id);
            conSock.emit('news', counter);
        });
    }, 200);
    //////////

    io.use(socketioJwt.authorize({
      secret: 'your secret or public key',
      handshake: true
    }));

    io.on('connection', function (socket) {
        console.log('User connected.');
        connectedSockets.push(socket);

        var time = new Date().getTime();
        console.log(time);
        socket.emit('news', time);

      socket.on('chatMsg', function (data) {
          console.log('chat message emitting data');
        io.sockets.emit('chatMsg', data);
      });

      socket.on('disconnect', function () {
          console.log('Socket disconnected: ' + socket.id);
          _.remove(connectedSockets, (conSock) => {
              return conSock.id === socket.id;
          });
      });

      socket.on('forceDisconnect', function() {
         socket.emit('manual-dc');
         socket.disconnect();
      });
    });


})();
