(function(vex){
  'use strict'

  angular.module('babble').factory('authSvc', function($http){
        var service = {};

        service.connect = function(host, port, username, password) {
          
            var connectingDialog = vex.dialog.open({
              message: 'Connecting to ' + host + ':' + port + (username ? ' as ' + username : '') + '...',
              showCloseButton: false,
              showConfirmButton: false,
              buttons: []
            });

            // simulation of after connected.
            setTimeout(function(){
              vex.close(connectingDialog.data().vex.id);
            }, 2000);

            console.log('Connecting to server ' + host + ':' + port + ' as user ' + username);
        }
        return service;
    });
})(vex);
