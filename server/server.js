var net = require('net');
var JsonSocket = require('json-socket');
var uuid = require('node-uuid');

var connectedClients = {};
var channels = [];
channels.push({
	id: 1,
	name: 'Lobby Channel',
	users: []
});
channels.push({
	id: 2,
	name: 'Discussion Channel',
	users: []
});
channels.push({
	id: 3,
	name: 'Smack Talk Channel',
	users: []
});

var deleteConnectedClient = function (connectionId) {
	delete connectedClients[connectionId];
};

var connectedClientsCount = function () {
	return Object.keys(connectedClients).length;
}

var port = 8888;
var server = net.createServer();
server.listen(port);

console.log(channels);
console.log("When I was young I'd listen to the radio, waiting for my favorite song...");

server.on('connection', function(socket) { //This is a standard net.Socket
    socket = new JsonSocket(socket); //Now we've decorated the net.Socket to be a JsonSocket

	var connectionId = uuid.v1(); // time based uuid?
	connectedClients[connectionId] = {
		connectionId: connectionId,
		socket: socket
	};

    console.log('A wild client connected! Now we have ' + connectedClientsCount() + ' connected clients');

    socket.on('message', function(message) {
        console.log('connectionId ' + connectionId + ' says: ' + JSON.stringify(message));
    });
    socket.on('end', function () {
		deleteConnectedClient(connectionId);
    	console.log('Connection id ' + connectionId + ' ended, now we have ' + connectedClientsCount() + ' connected clients');
    });

    socket.on('error', function (err) {
		deleteConnectedClient(connectionId);
    	console.log(err);
    	console.log('Connection id ' + connectionId + ' ended, now we have ' + connectedClientsCount() + ' connected clients');
    });
});