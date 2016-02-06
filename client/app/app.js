(function() {
  'use strict'

  var app = angular.module('babble', ['ui.router']);

  app.config(function($stateProvider) {
      console.log('config loaded correctly.', $stateProvider);
      alert('app.js');
  });

})();
