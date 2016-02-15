(function(config, express) {
    'use strict'
    var app = express();

    function startHttp() {

        app.use(express.static(__base + 'app'));
        app.use('/', express.static(__base + 'app/views'));
        app.use('/styles', express.static(__base + 'app/assets/styles/css'));
        app.use('/login/styles/', express.static(__base + 'login/assets/styles/css'));
        app.use('/external', express.static(__base + 'bower_components'));

        app.listen(config.httpPort, (req, res) => {
            console.log('listening on port ' + config.httpPort);
        });

        registerHttpRoutes();
    }

    function registerHttpRoutes() {

      app.get('/', (req, res) => {
        console.log('get root');
        res.sendFile(__base + 'app/views/_layout.html');
      });

      app.get('/authenticate', (req, res) => {
        console.log('get authenticate');
        res.sendFile(__base + 'login/index.html');
      });
        // for (var i = 0; i < routes.length; i++) {
        //   console.log('reg route');
        //     var route = routes[i];
        //     app[route.method](route.path, route.handler);
        // }
    }

    return module.exports = {
        start: () => {
            startHttp();
        }
    };

})(
    require('./config.js'), // maybe need better paths
    require('express')
);
