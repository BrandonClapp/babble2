(function(ipc) {
  'use strict'

  angular.module('babble').factory('windowSvc', function() {
    var service = {};
    var actions = {}

    service.open = function(windowName) {
      ipc.send(windowName);
    }

    return service;
  });
})(require('ipc'));
