(function() {
  'use strict'

  var app = angular.module('babble', ['ui.router']);



  app.config(function($stateProvider, $urlRouterProvider) {

      $stateProvider
      .state('home', {
          url: "/",
          templateUrl: "home.html",
          controller: 'home.controller'
      })
      .state('connected', {
          url: "/connected",
          templateUrl: "connected.html",
          controller: 'connected.controller'
      })

      $urlRouterProvider.otherwise("/");
  });
})();
