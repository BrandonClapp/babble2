(function(){
  'use strict'

  angular.module('babble').controller('newConnectionCtrl',  ['$scope', 'windowSvc',
    function($scope, windowSvc) {

      console.log('loading newConnectionCtrl');

      $scope.test = 'newConnectionCtrl working.';
      
    }]
 )
})();
