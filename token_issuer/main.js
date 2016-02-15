((config, express, jsonParser, jwt, secret) => {
  'use strict'
  var app = express();

  app.use('/styles', express.static(__dirname + '/assets/styles/css'));
  app.use('/external', express.static(__dirname + '/bower_components'));

  app.listen(config.port, (req, res) => {
    console.log('Token issuer - listening on port ' + config.port);
  });

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  function userValid(username, password) {
      // todo: store users somewhere and hash/salt passwords.
      return (username === 'Brandon' && password === 'test');
  }

  app.post('/authenticate/creds/', jsonParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);
    let username = req.body.username;
    let password = req.body.password;

    console.log('Attempting to validate credentials', { username: username, password: password });

    if(userValid(username, password)) {
      let token = jwt.sign({
          username: username
      }, secret);
      res.send(token);
    }

  });

  // app.post('/authenticate/token/', jsonParser, (req, res) => {
  //   if (!req.body) return res.sendStatus(400);
  //   let sentToken = req.body.token;
  //   let tokenValid = false;
  //   let decoded = {};
  //
  //   console.log('Attempting to validate token: ' + sentToken);
  //
  //   try {
  //       if (sentToken) {
  //           decoded = jwt.verify(sentToken, secret);
  //           tokenValid = true;
  //       }
  //   } catch (err) {
  //       console.log('invalid token.');
  //       res.sendStatus(401)
  //   }
  //
  //   if(tokenValid) {
  //     let token = jwt.sign({
  //         username: decoded.username
  //     }, secret);
  //     res.send(token);
  //   }

    res.sendStatus(401)
  });

})(
  require('./config.js'), // maybe need better paths
  require('express'),
  require('body-parser').json(),
  require('jsonwebtoken'),
  require('./secret')()
)
