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

        function getToken() {
            var item = localStorage.getItem('token');
            if(item) {
                return JSON.parse(item);
            }

            return null;
        }

        function setToken(token) {
            if(token) {
                localStorage.setItem('token', JSON.stringify(token));
            } else {
                localStorage.setItem('token', '');
            }
        }

        return {
            ioLoaded: false,
            setLastConnectedServer: setLastConnectedServer,
            getLastConnectedServer: getLastConnectedServer,
            getToken: getToken,
            setToken: setToken
        }
    }]);
})();
