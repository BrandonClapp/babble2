'use strict'

var app = require('app');
var ipc = require('ipc');
var BrowserWindow = require('browser-window');

// window declaration
var mainWindow = null;

app.on('ready', function(){
  mainWindow = new BrowserWindow({
    width: 450,
    height: 600,
    //frame: false
  });

  ipc.on('quit', function(e){
     app.quit();
  });

  mainWindow.loadUrl('file://' + __dirname + '/app/index.html')
  mainWindow.setMenu(null);
});
