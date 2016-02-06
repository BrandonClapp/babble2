'use strict'

class Host {

    constructor(express) {
        this.app = express();
    }

    start() {
        this.app.listen(3000, (req, res) => {
            console.log('listening on 3000.');
        });
    }

    addRoute(method, path, handler) {
        this.app[method](path, handler);
    }
}

// var express = require('express');
// var host = new Host(express);
//
// host.addRoute('get', '/', (req, res) => {
//     console.log('handled.');
// });
// host.start();
