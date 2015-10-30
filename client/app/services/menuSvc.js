(function(){
  'use strict'

    var menus = {
      index: require('./menus/index.js')
    }

  angular.module('babble').factory('menuSvc', function(){
    var service = {};
    var actions = {}

    menus.index.events.newConnectionClick = function(){
        // notify all subscribers
        console.log('newConnectionClick from menuSvc');
        notifySubscribers('newConnectionClick');
    }

    service.display = function(menuName){
        console.log('display called menuSvc');
      menus[menuName || 'index'].display();
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
