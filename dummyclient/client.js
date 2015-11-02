var net = require('net');
var JsonSocket = require('json-socket');

var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var myUser = {};
var channels = [];

var port = 8888; //The same port that the server is listening on
var host = '127.0.0.1';
var netsocket = new net.Socket();
var socket = new JsonSocket(new net.Socket()); //Decorate a standard net.Socket with JsonSocket
socket.connect(port, host);
socket.on('connect', function() { //Don't send until we're connected

    console.log('client is connected');
    
    socket.on('message', function(message) {
        handleMessage(message);
    });
    
    rl.on('line', function (line) {
        if (line == 'exit' || line == 'end' || line == 'close') {
            rl.close();
            socket.end();
        }
        else {
            var splits = line.split(' ');
            if (splits[0] == 'joinChannel') {
                socket.sendMessage({messageType:'userJoinChannelRequest', data: parseInt(splits[1])})
            }
            
            else {
                socket.sendMessage({messageType: 'chat', data: line});                
            }
        }
    });
    
});

function handleMessage(message) {
    switch (message.messageType) {
        case 'credentialResponse':
            myUser = message.data;
            console.log('im authenticated? my credential is ', myUser);
            socket.sendMessage({messageType:'getAllChannelsRequest'});
            break;
        case 'chat':
            console.log(message.data.user.username + ': ' + message.data.data);
            break;
        case 'getAllChannelsResponse':
            channels = message.data;
            console.log('current channel information: ');
	        console.log(JSON.stringify(channels, null, 2));
            break;
        case 'userJoinChannelResponse':
            var user = message.data;
            break;
    }
}