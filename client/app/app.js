(function() {
  'use strict'

  var app = angular.module('babble', ['ui.router']);

  app.config(function($stateProvider, $urlRouterProvider) {
      console.log('config loaded correctly.', $stateProvider);

      $stateProvider
      .state('home', {
          url: "/",
          templateUrl: "home.html",
          controller: 'homeCtrl'
      })
      .state('connected', {
        url: "/connected",
        templateUrl: "connected.html",
        controller: 'connectedCtrl'
    });

      $urlRouterProvider.otherwise("/");
  });

})();
