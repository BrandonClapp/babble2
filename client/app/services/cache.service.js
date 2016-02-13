(() => {
    'use strict'
    angular.module('babble').factory('cache', [function() {

        function setLastConnectedServer(lastConnectedServer) {
            if(lastConnectedServer) {
                console.log('setting lastConnectedServer to an object');
                localStorage.setItem('lastConnectedServer', JSON.stringify(lastConnectedServer));
            } else {
                console.log('setting lastConnectedServer to empty string')
                localStorage.setItem('lastConnectedServer', '');
            }
        }

        function getLastConnectedServer() {
            var item = localStorage.getItem('lastConnectedServer');
            console.log('item', item);
            if(item) {
                return JSON.parse(item);
            }

            return null;
        }

        return {
            ioLoaded: false,
            setLastConnectedServer: setLastConnectedServer,
            getLastConnectedServer: getLastConnectedServer
        }
    }]);
})();
