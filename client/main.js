'use strict'

// Bootstrap Modules
var config = require('./config.js');
var host = require('./host/host.js').start();

// Electron Modules
var app = require('app');
var ipc = require('ipc');
var BrowserWindow = require('browser-window');

// Initialize Electron Window
function initApp() {
    var mainWindow = null;
    var newConnectionWindow = null;

    app.on('ready', function() {
      mainWindow = new BrowserWindow({
        width: 500,
        height: 600,
        webaudio: true
        //frame: false
      });

      ipc.on('quit', function(e){
        console.log('quitting...');
         app.quit();
      });

      ipc.on('newConnectionWindow', function(){
        newConnectionWindow = new BrowserWindow({
          width: 450,
          height: 350,
        });

        newConnectionWindow.loadUrl('file://' + __dirname + '/app/views/newConnection.html');
      });

      // mainWindow.loadUrl('file://' + __dirname + '/app/views/home.html');
      mainWindow.loadUrl('http://localhost:' + config.httpPort);

      // maybe initialize this to index menu to stop flickering.
      mainWindow.setMenu(null);
    });
}

initApp();


// debugging utility
function ls(dir) {
    var fs = require('fs');
    fs.readdir(dir, (err, files) => {
        for (var i = 0; i < files.length; i++) {
            console.log(files[i]);
        }
    });
}
