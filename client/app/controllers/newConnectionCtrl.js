(function(vex, auth) {
  'use strict'

  angular.module('babble').controller('newConnectionCtrl', ['$scope', function($scope) {

    var close = function() {
      $scope.form = {};
      $scope.display.newConnectionOverlay = false;
      $scope.$apply();
    }

      $scope.onConnectSubmit = function(form) {
        auth.connect(form.host, form.port, form.username, form.password).then(function(){
          vex.dialog.alert('Successfully connected. Message of the day!');
          close();
        }, function(err){
          vex.dialog.alert('Error while connecting: ' + err.toString());
        });
      }

      $scope.onCancelNewConnection = function() {
        close();
      }

    }
  ])
})(vex, require('./../services/auth.js'));
