(function(auth) {
    'use strict'

    angular.module('babble').controller('newConnectionCtrl', ['$scope', function($scope) {
        $scope.form = {
            host: '127.0.0.1',
            port: 8888
        };

        var close = function() {
            //$scope.form = {};
            $scope.form.password = null; // keep all info except password for reconnect friendly
            $scope.display.newConnectionOverlay = false;
            $scope.$apply();
        }

        $scope.onConnectSubmit = function(form) {
            auth.connect(form.host, form.port, form.username, form.password).then(function() {
                alert('Successfully connected. Message of the day!');
                close();
            }, function(err) {
                alert('Error while connecting: ' + err.toString());
            });
        }

        $scope.onCancelNewConnection = function() {
            close();
        }

    }])
})(require('./../services/auth.js'));
