(function(config, express, httpRoutes){
    'use strict'
    var app = express();

    function startHttp(routes) {

        // app.use(express.static(__base + 'app'));
        // app.use('/app/views', express.static(__base + 'app/views'));
        // app.use('/app/assets/styles/css', express.static(__base + 'app/assets/styles/css'));
        // app.use('/bower_components', express.static(__base + 'bower_components')); // consider moving front end pieces out into bower.

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
    require(__base + '/api/httpRoutes.js')
  );
