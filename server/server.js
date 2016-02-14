(() => {
    'use strict'
    let app =           require('express')();
    let server =        require('http').Server(app);
    let io =            require('socket.io')(server);
    let socketioJwt =   require('socketio-jwt');
    let _ =             require('lodash-node');
    let tokenIssuer =   require('./tokenIssuer.js');
    let secret =        require('./secret.js')();

    server.listen(9000);

    // todo: add logic to disconnect clients after a period of inactivity.
    // todo: add caching for things that should be persisted.

    // enable CORS
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    tokenIssuer.expose(app);

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
      secret: secret,
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
