(function(){
  'use strict'

  angular.module('babble').controller('newConnectionCtrl',  ['$scope', 'windowSvc',
    function($scope, windowSvc) {

      $scope.test = 'newConnectionCtrl working.';

      $scope.onConnectSubmit = function(form){
          console.log('Connect submissions');
          console.log(form);

          swal({
            title: "Connecting...",
            text: "Now connecting to " + form.host + ":" + form.port,
            type: "info",
            showCancelButton: false,
            showConfirmButton: false
          });
      }

    }]
 )
})();
