(function() {
    'use strict'

    var app = angular.module('babble', ['ui.router', 'oc.lazyLoad']);

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

    app.config(function($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            events: true
        });
    });
})();
