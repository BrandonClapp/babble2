(function(){
  'use strict'

  angular.module('babble').factory('authSvc', function($http){
        var service = {};

        service.connect = function(host, port, username, password) {

            swal({
              title: "An input!",
              text: 'Write something interesting:',
              type: 'input',
              showCancelButton: true,
              closeOnConfirm: false,
              animation: "slide-from-top"
            }, function(inputValue){
              console.log("You wrote", inputValue);
            });

            console.log('Connecting to server ' + host + ':' + port + ' as user ' + username);
        }
        return service;
    });
})();
