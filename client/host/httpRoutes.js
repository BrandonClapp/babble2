//////////////////////////////////////////////////////////
//
//  Routes for receiving HTTP messages from the server.
//
//////////////////////////////////////////////////////////
'use strict'

var config = require(__base + 'config.js');

module.exports =
[
    {
        method: 'get',
        path: '/receive/someMessage',
        handler: (req, res) => {
            console.log('handled test.');
            res.send('test handled');
        }
    }
]
