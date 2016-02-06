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

    httpPort: 9001,
    udpPort: 1234
}
