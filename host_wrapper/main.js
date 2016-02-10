'use strict'
global.__base = __dirname + '/';

// Bootstrap Modules
var config = require(__base + 'config.js');
var httpListener = require(__base + 'api/host.js').start();

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
        width: 800,
        height: 600,
        webaudio: true
        //frame: false
      });

      ipc.on('quit', function(e){
        console.log('quitting...');
         app.quit();
      });

    //   ipc.on('newConnectionWindow', function(){
    //     newConnectionWindow = new BrowserWindow({
    //       width: 800,
    //       height: 600,
    //     });
      //
    //     newConnectionWindow.loadUrl('file://' + __dirname + '/app/views/newConnection.html');
    //   });

      mainWindow.loadUrl('file://' + __dirname + '/app/views/_layout.html');
      //mainWindow.loadUrl('http://localhost:' + config.httpPort);

      // maybe initialize this to index menu to stop flickering.
      //mainWindow.setMenu(null);
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
