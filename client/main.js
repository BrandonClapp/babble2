'use strict'

var app = require('app');
var ipc = require('ipc');
var BrowserWindow = require('browser-window');

// window declaration
var mainWindow = null;
var newConnectionWindow = null;

app.on('ready', function(){
  mainWindow = new BrowserWindow({
    width: 500,
    height: 600,
    //frame: false
  });

  ipc.on('quit', function(e){
    console.log('quitting...');
     app.quit();
  });

  // ipc.on('newConnectionWindow', function(){
  //   newConnectionWindow = new BrowserWindow({
  //     width: 450,
  //     height: 350,
  //   });
  //
  //   newConnectionWindow.loadUrl('file://' + __dirname + '/app/views/newConnection.html');
  // });

  mainWindow.loadUrl('file://' + __dirname + '/app/views/home.html')
  // maybe initialize this to index menu to stop flickering.
  mainWindow.setMenu(null);
});
