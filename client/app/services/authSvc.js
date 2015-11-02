(function(vex) {
  'use strict'

  var tcp = require('./../services/tcp.js');

  angular.module('babble').factory('authSvc', function($http) {
    var service = {};

    // todo: make this a promise.
    service.connect = function(host, port, username, password) {
      var connectingDialog = vex.dialog.open({
        message: 'Connecting to ' + host + ':' + port + (username ? ' as ' + username : '') + '...',
        showCloseButton: false,
        showConfirmButton: false,
        buttons: []
      });

      // make this a promise.
      tcp.connect(host, port, function(){
        vex.close(connectingDialog.data().vex.id);
        // resolve promise.
      });

      console.log('Connecting to server ' + host + ':' + port + ' as user ' + username);
    }
    return service;
  });
})(vex);
