(function() {
  'use strict'

  var app = angular.module('babble', ['ui.router', 'btford.socket-io']);

  app.config(function($stateProvider, $urlRouterProvider) {

      $stateProvider
      .state('home', {
          url: "/",
          templateUrl: "home.html",
          controller: 'home.controller'
      })

      $urlRouterProvider.otherwise("/");
  });

})();
