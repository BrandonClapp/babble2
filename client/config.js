var __base = __dirname + '/';
module.exports = {
    ext: [
        __base + 'app/assets/styles/ext'
    ],
    sass: [
        __base + 'app/assets/styles/sass/**/*.scss',
        __base + 'app/assets/styles/sass/**/*.sass'
    ],
    css: __base + 'app/assets/styles/css/',
    views: __base + 'app/views/',

    login_sass: [
        __base + 'login/assets/styles/sass/**/*.scss',
        __base + 'login/assets/styles/sass/**/*.sass'
    ],
    login_css: __base + 'login/assets/styles/css/',

    tokenIssuer: 'http://localhost:3002/'
}
