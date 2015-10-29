var app = require('app');
var BrowserWindow = require('browser-window');

// window declaration
var mainWindow = null;

app.on('ready', function(){
  mainWindow = new BrowserWindow({
    width: 450,
    height: 600,
    //frame: false
  });

  mainWindow.loadUrl('file://' + __dirname + '/app/index.html');
});
