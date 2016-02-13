(function() {
    'use strict'
    angular.module('babble').controller('home.controller', ['$scope', '$state', 'dataSocket', function($scope, $state, dataSocket) {
        dataSocket.on('news', function (data) {
          console.log(data);
          dataSocket.emit('my other event', { my: 'data' });
        });
    }]);
})();
