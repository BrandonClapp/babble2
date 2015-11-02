(function(_) {
  'use strict'

  var actions = [];

  function on(eventName, cb) {
    if (!actions[eventName]) {
      actions[eventName] = [];
    }
    actions[eventName].push(cb);
  }

  var notifySubscribers = function(action, params) {
    _.each(actions[action], function(subscriber) {
      subscriber(params);
    });
  }

  function fire(eventName, params) {
    notifySubscribers(eventName, params);
  }

  var exports = {
    on: on,
    fire: fire
  }

  module.exports = exports;
})(_);
