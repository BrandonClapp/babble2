var gulp = require('gulp');
var config = require('./config.js');
var del = require('del');
var plugins = require('gulp-load-plugins')({lazy:true});

gulp.task('styles', ['clean-styles'], function() {
    log('Compiling Less --> CSS');
    return gulp
        .src(config.less)
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer())
        .pipe(gulp.dest(config.css));
});

gulp.task('clean-styles', function(done) {
    var files = config.css + '*.css';
    clean(files, done);
});

function clean(path, done) {
    log('Cleaning: ' + plugins.util.colors.blue(path));
    del(path).then(done());
}

function log(msg) {
    plugins.util.log(plugins.util.colors.blue(msg));
}
