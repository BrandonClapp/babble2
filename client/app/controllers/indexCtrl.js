(function(){
  
  angular.module('babble').controller('indexCtrl',  ['$scope', 'menuSvc',
    function($scope, menuSvc) {

      menuSvc.display();
      $scope.test = '360 no $scope';

    }]
 )
})();
