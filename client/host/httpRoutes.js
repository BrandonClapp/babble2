'use strict'

var config = require(__base + 'config.js');

module.exports =
[
    {
        method: 'get',
        path: '/',
        handler: (req, res) => {
            console.log('layout page', config.views + '_layout.html');
            res.sendFile(config.views + '_layout.html');
        }
    },
    {
        method: 'get',
        path: '/test',
        handler: (req, res) => {
            console.log('handled test.');
            res.send('test handled');
        }
    }
]
