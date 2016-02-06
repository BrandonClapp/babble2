'use strict'

module.exports =
[
    {
        method: 'get',
        path: '/',
        handler: (req, res) => {
            console.log('handled root.');
            res.send('root handled');
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
