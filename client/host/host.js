(function(config, express, httpRoutes){
    'use strict'
    var app = express();

    function startHttp(routes) {

        app.listen(config.httpPort, (req, res) => {
            console.log('listening on port ' + config.httpPort);
        });

        registerHttpRoutes(routes);

        // app.get('/', (req, res) => {
        //     console.log('root invoked.');
        //     res.send('OK');
        // });
    }

    function registerHttpRoutes(routes) {
        for(let i = 0; i < routes.length; i++) {
            let route = routes[i];
            app[route.method](route.path, route.handler);
        }
    }

    function startUdp() {
        console.log('starting udp.');
    }

    return module.exports = {
        start: () => {
            startHttp(httpRoutes);
            startUdp();
        }
    };

})(require('./../config.js'), require('express'), require('./httpRoutes'));
