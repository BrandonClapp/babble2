(function(){
  'use strict'

  var menuHelper = require('./menus/helper.js');

  angular.module('babble').factory('menuSvc', function(){
    var service = {};

    service.display = function(windowName){
      menuHelper.display(windowName);
    }

    return service;
  });
})();
