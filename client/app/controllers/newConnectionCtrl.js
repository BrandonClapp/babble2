(function() {
  'use strict'

  angular.module('babble').controller('newConnectionCtrl', ['$scope', 'authSvc',
    function($scope, authSvc) {

      $scope.onConnectSubmit = function(form) {
        authSvc.connect(form.host, form.port, form.username, form.password);
      }

      $scope.onCancelNewConnection = function() {
        $scope.form = {};
        $scope.display.newConnectionOverlay = false;
      }
    }
  ])
})();
