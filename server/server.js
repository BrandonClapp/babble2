"use strict";

var net = require('net');
var JsonSocket = require('json-socket');
var uuid = require('node-uuid');
var _ = require('lodash-node');

var clients = [];
var channels = [];
initChannels();

var port = 8888;
var server = net.createServer();
server.listen(port);

console.log(channels);
console.log("When I was young I'd listen to the radio, waiting for my favorite song...");

server.on('connection', function(socket) { //This is a standard net.Socket
    socket = new JsonSocket(socket); //Now we've decorated the net.Socket to be a JsonSocket
	var connectionId = uuid.v1();
	var user = {
		connectionId: connectionId,
		channelId: 0
	};
	var client = {
		user: user,
		socket: socket
	}
	addClient(client);
	addUserToChannel(user, 1);

    console.log('A wild client connected! Now we have ' + clientsCount() + ' connected clients');

    socket.on('message', function(message) {
        handleMessage(user, message);
    });
    socket.on('end', function () {
		deleteClient(connectionId);
    	console.log('Connection id ' + connectionId + ' ended, now we have ' + clientsCount() + ' connected clients');
    });
    socket.on('error', function (err) {
		deleteClient(connectionId);
    	console.log(err);
    	console.log('Connection id ' + connectionId + ' ended, now we have ' + clientsCount() + ' connected clients');
    });
});

// Message handlers

function handleMessage(user, message) {
	console.log('handling message type: ' + message.messageType);
	switch (message.messageType) {
		case 'chat':
			broadcastChannel(user.channelId, message);
			break;
	}
}

// Broadcast
function broadcastAll(message) {
	_.each(clients, function (client) {
		client.socket.sendMessage(message);
	});
}

function broadcastChannel(channelId, message) {
	var channel = _.find(channels, {id: channelId});
	if (!channel) {
		return;
	}
	
	_.each(channel.users, function (user) {
		var client = _.find(clients, {user: {connectionId: user.connectionId}});
		if (!client) {return;}
		client.socket.sendMessage(message);
	});
}

// Data operation functions (helper and stuff)

function initChannels() {
	channels = [];
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
}

function addClient(client) {
	clients.push(client);
}

function deleteClient(connectionId) {
	_.remove(clients, {connectionId: connectionId});
};

function clientsCount() {
	return clients.length;
}

function addUserToChannel(user, channelId) {
	var channel = _.find(channels, {id: channelId});
	if (!channel) { 
		console.log('addUserToChannel: unable to find channelId ' + channelId);
		return; 
	}
	
	removeUserFromChannel(user);
	channel.users.push(user);
	user.channelId = channel.id;
	
	console.log('current channel information: ');
	console.log(JSON.stringify(channels, null, 2));
}

function removeUserFromChannel(user) {
	_.each(channels, function (channel) {
		_.remove(channel.users, {connectionId: user.connectionId})		
	});
	user.channelId = 0;
}

