((jsonParser, jwt, secret) => {
    'use strict'

    function userValid(username, password) {
        // todo: store users somewhere and hash/salt passwords.
        return (username === 'Brandon' && password === 'test');
    }

    function expose(app) {

        app.post('/authenticate', jsonParser, function(req, res) {
            if (!req.body) return res.sendStatus(400);

            let username = req.body.username;
            let password = req.body.password;
            let sentToken = req.body.token;
            let tokenValid = false;

            console.log({
                usrname: username,
                password: password,
                sentToken: sentToken
            });

            try {
                if (sentToken) {
                    let decoded = jwt.verify(sentToken, secret);
                    tokenValid = true;
                }
            } catch (err) {
                console.log('invalid token.');
            }

            // todo: look up user to see if they exist.
            if (userValid(username, password) || tokenValid) {
                // sign with default (HMAC SHA256)
                let token = jwt.sign({
                    username: username,
                    host: req.body.host,
                    port: req.body.port
                }, secret);
                res.send(token);
            } else {
                res.sendStatus(401);
            }
        });
    }

    return module.exports = {
        expose: expose
    }

})(
    require('body-parser').json(),
    require('jsonwebtoken'),
    require('./secret')()
);
