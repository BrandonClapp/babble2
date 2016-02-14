(function(config, express, httpRoutes) {
    'use strict'
    var app = express();

    function startHttp(routes) {

        app.use(express.static(__base + 'app'));
        app.use('/', express.static(__base + 'app/views'));
        app.use('/styles', express.static(__base + 'app/assets/styles/css'));
        app.use('/external', express.static(__base + 'bower_components'));

        app.listen(config.httpPort, (req, res) => {
            console.log('listening on port ' + config.httpPort);
        });

        registerHttpRoutes(routes);
    }

    function registerHttpRoutes(routes) {
        for (let i = 0; i < routes.length; i++) {
            let route = routes[i];
            app[route.method](route.path, route.handler);
        }
    }

    return module.exports = {
        start: () => {
            startHttp(httpRoutes);
        }
    };

})(
    require('./config.js'), // maybe need better paths
    require('express'),
    require('./httpRoutes.js')
);
