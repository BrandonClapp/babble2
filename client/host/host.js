(function(config, express, httpRoutes){
    'use strict'
    var app = express();

    function startHttp(routes) {

        //app.use(express.static(config.views));
        app.use(express.static(__base + 'app'));
        app.use('node_modules', express.static(__base + 'node_modules')); // consider moving front end pieces out into bower.

        app.listen(config.httpPort, (req, res) => {
            console.log('listening on port ' + config.httpPort);
        });

        registerHttpRoutes(routes);
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

})(
    require(__base + 'config.js'),
    require('express'),
    require(__base + '/host/httpRoutes.js')
  );
