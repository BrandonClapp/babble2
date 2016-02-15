var gulp = require('gulp');
var config = require('./config');
var del = require('del');
var plugins = require('gulp-load-plugins')({
    lazy: true
});

gulp.task('styles', ['clean-styles', 'login-styles'], function() {
    log('Compiling SASS --> CSS');
    return gulp
        .src(config.sass)
        .pipe(plugins.sass().on('error', log))
        .pipe(plugins.autoprefixer())
        .pipe(gulp.dest(config.css));
});

gulp.task('login-styles', function() {
    log('Compiling Login SASS --> CSS');
    return gulp
        .src(config.login_sass)
        .pipe(plugins.sass().on('error', log))
        .pipe(plugins.autoprefixer())
        .pipe(gulp.dest(config.login_css));
});

gulp.task('styles-watch', function() {
    gulp.watch(config.sass, ['styles']);
});

gulp.task('clean-styles', function(done) {
    var files = config.css + '*.css';
    clean(files, done);
});

gulp.task('default', ['clean-styles']);

function host() {
    // run 'node ./app_server/host.js'
}

function clean(path, done) {
    log('Cleaning: ' + plugins.util.colors.blue(path));
    del(path).then(done());
}

function log(msg) {
    plugins.util.log(plugins.util.colors.blue(msg));
}
