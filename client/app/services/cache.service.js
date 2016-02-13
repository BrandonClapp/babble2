(() => {
    'use strict'
    angular.module('babble').factory('cache', [function() {
        return {
            ioLoaded: false
        }
    }]);
})();
