'use strict'

var app = require('app');
var ipc = require('ipc');
var BrowserWindow = require('browser-window');

// window declaration
var mainWindow = null;
var newConnectionWindow = null;

app.on('ready', function(){
  mainWindow = new BrowserWindow({
    width: 450,
    height: 600,
    //frame: false
  });

  ipc.on('quit', function(e){
     app.quit();
  });

  ipc.on('newConnectionWindow', function(){
    newConnectionWindow = new BrowserWindow({
      width: 300,
      height: 300,
    });

    newConnectionWindow.loadUrl('file://' + __dirname + '/app/views/newConnection.html')
  });

  mainWindow.loadUrl('file://' + __dirname + '/app/views/index.html')
  mainWindow.setMenu(null);
});
