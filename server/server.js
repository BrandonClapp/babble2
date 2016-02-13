(() => {
    'use strict'
    var app = require('express')();
    var server = require('http').Server(app);
    var io = require('socket.io')(server);

    server.listen(9000);

    // app.get('/', function (req, res) {
    //   res.sendfile(__dirname + '/index.html');
    // });
    var counter = 0;

    var connectedSockets = [];

    var counter = 0;
    setInterval(() => {
        counter++;
        for(var i = 0; i < connectedSockets.length; i++) {
            console.log('emitting ' + counter + ' to ' + i);
            connectedSockets[i].emit('news', counter);
        }
    }, 1000);

    io.on('connection', function (socket) {
        console.log('User connected.');
        connectedSockets.push(socket);

        var time = new Date().getTime();
        console.log(time);
        socket.emit('news', time);

      socket.on('my other event', function (data) {
        console.log(data);
      });
    });
})();
