(function(){
  'use strict'

    var menus = {
      home: require('./../menus/home.js')
    }

  angular.module('babble').factory('menuSvc', function() {
    var service = {};
    var actions = {}

    menus.home.events.newConnectionClick = function() {
        notifySubscribers('newConnectionClick');
    }

    service.display = function(menuName){
        console.log('display called menuSvc');
      menus[menuName || 'home'].display();
    }

    service.on = function(eventName, cb) {
        if(!actions[eventName]){
            actions[eventName] = [];
        }
        actions[eventName].push(cb);
    }

    var notifySubscribers = function (action, params) {
        _.each(actions[action], function (subscriber) {
            subscriber(params);
        });
    }

    return service;
  });
})();
