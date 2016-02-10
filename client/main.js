// Entry point for client.
(function() {
    'use strict'
    global.__base = __dirname + '/';

    var host = require(__base + 'app_server/host.js');
    host.start();

})();
