(function(){
  'use strict'

  angular.module('babble').controller('homeCtrl',  ['$scope', 'menuSvc',
    function($scope, menuSvc) {

      menuSvc.display();
      $scope.test = '360 no $scope';

    }]
 )
})();
