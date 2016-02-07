(function(auth) {
    'use strict'

    angular.module('babble').controller('newConnectionCtrl', ['$scope', function($scope) {

        $scope.form = {
            host: '127.0.0.1',
            port: 8888
        };

        var resetForm = function() {
            //$scope.form = {};
            $scope.form.password = null; // keep all info except password for reconnect friendly
            $scope.display.newConnectionOverlay = false;
            $scope.$apply();
        }

        $scope.onConnectSubmit = function(form) {
            auth.connect(form.host, form.port, form.username, form.password).then(function() {

                // upon connecting, this needs to be cached somewhere.
                alert('Successfully connected. Message of the day!');
                close();
            }, function(err) {
                alert('Error while connecting: ' + err.toString());
            });
        }

        $scope.onCancelNewConnection = function() {
            resetForm();
        }

    }])
})(require('./../services/auth.js'));
