(function(request) {
    'use strict'

    let server_base = 'http://127.0.0.1:3000';

    return module.exports = {
        send: (messageType, data) => {
            console.log('POST server url', server_base + '/receive/' + messageType)
            console.log('messageType ' + messageType)
            console.log('data', data);
        }
    }
})(require('request'));
