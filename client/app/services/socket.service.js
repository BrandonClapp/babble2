(() => {
    'use strict'
    angular.module('babble').factory('dataSocket', ['socketFactory', function(socketFactory) {
        var myIoSocket = io.connect('http://localhost:9000/');

          var mySocket = socketFactory({
            ioSocket: myIoSocket
          });

          return mySocket;
    }]);
})();
