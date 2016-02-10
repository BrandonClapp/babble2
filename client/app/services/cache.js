// (function(events) {
//
//     function set(key, value) {
//         window.localStorage.setItem(key, value);
//     }
//
//     function get(key) {
//         return window.localStorage.getItem(key);
//     }
//
//     events.on('disconnect', () => {
//         set('server.host', '');
//         set('server.port', '');
//     });
//
//     return module.exports = {
//         set: set,
//         get: get
//     }
//
// })(require('./events.js'));
