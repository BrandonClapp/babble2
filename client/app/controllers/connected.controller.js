(function() {
    'use strict'
    angular.module('babble').controller('connected.controller', ['$scope', '$state', 'socket', function($scope, $state, socket) {
        // socket.forward('news', $scope);
        // $scope.$on('socket:news', function (ev, data) {
        //   $scope.news = data;
        // });
        socket.load();

        socket.on('news', function (data) {
          console.log(data);
          $scope.news = data.toString();
          $scope.$apply();
          socket.emit('my other event', { my: 'data' });
        });
    }]);
})();
