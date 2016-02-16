# Clever name pending

## Client

1. `cd client`
2. `npm install`
3. `npm install`
4. `bower install`
5. `gulp styles`  - build sass styles into css.
6. `node main.js` - Start client app.

### Client gulp utilities

`gulp styles` - Compile sass/scss into css directory.
`gulp styles-watch` - Watch for sass/scss file changes and auto compile into css directory.
`gulp clean` - Clean css directory.

## Server

The server will be responsible for serving data to the client such as chat messages, voice buffers, change channel messages...etc. This component does all communication to/from the client through a persistent web socket connection.

In order to successfully open a web socket connection, the client must provide a JWT token, which can be obtained through the token issuer.

1. `cd server`
2. `npm install`
3. `node server.js` - Start server

## Token Issuer

The JWT token issuer resides in a separate process. The client will attempt to post a user's credentials to the token issuer. If they are valid, the token issuer will return a JWT token, which will then be persisted in localStorage for later consumption.

Start token issuer:

`cd token_issuer`
`npm install`
`node main.js`
