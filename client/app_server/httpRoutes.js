'use strict'

module.exports =
[
    {
        method: 'get',
        path: '/',
        handler: (req, res) => {
            console.log('handled root.');
            res.sendFile(__base + 'app/views/_layout.html');
        }
    }
]
