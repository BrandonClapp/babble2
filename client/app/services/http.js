(function(request) {
    'use strict'

    return module.exports = {
        send: (messageType, data) => {
            console.log('messageType ' + messageType)
        }
    }
})(require('request'));
