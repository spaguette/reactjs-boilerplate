var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-rimraf');
var childProcess = require('child_process');
var htmlreplace = require('gulp-html-replace');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

// Cache directory
var cacheDir = './cache/';
// Webpack build folder
var buildFolder = './build/';
// Gulp release folder
var releaseFolder = './release/';
// Folder for public files
var releasePublicFolderName = 'public';
// index.html
var indexFile = 'index.html';
// Version of the program, found in git, dev by default
var appVersion = 'dev';

/**
 * Deletion of outdated cache folder
 * */
gulp.task('clean-cache', function () {
    return gulp.src(cacheDir, {read: false})
        .pipe(clean());
});

/**
 * Deletion of outdated release folder
 * */
gulp.task('clean-release', function () {
    return gulp.src(releaseFolder, {read: false})
        .pipe(clean());
});

/**
 * Deletion of build folder
 * */
gulp.task('clean-build', function () {
    return gulp.src(buildFolder, {read: false})
        .pipe(clean());
});

/**
 * Run build command
 * */
gulp.task('webpack-build', ['clean-release'], function(callback) {
    var webpackProductionConfig = Object.assign({}, require('./webpack.config.production'));
    // run webpack
    webpack(webpackProductionConfig, function(err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack-build', err);
        }
        gutil.log('[webpack-build]', stats.toString({
            colors: true
        }));
        callback(err);
    });
});

/**
 * Run compilation of language files
 * */
gulp.task('app-localizations', function (callback) {
    //use some internalization framework here, like l10ns
    //childProcess.exec('l10ns compile', {env: process.env}, function (execError) {
        //if (execError) {
           // return callback(execError);
      //  }
        callback();
   // });
});

/**
 * Run command to get the version of the application
 * */
gulp.task('app-version', function (callback) {
    childProcess.exec('git describe --always', function (execError, stdout) {
        if (execError) {
            return callback(execError);
        }
        appVersion = stdout.trim();
        callback();
    });
});

/**
 * Moving css files to release folder
 * */
gulp.task('build-css', ['webpack-build'], function () {
    return gulp.src(buildFolder + '*.css')
        .pipe(gulp.dest(releaseFolder));
});

/**
 * Moving js files to release folder
 * */
gulp.task('build-js', ['webpack-build'], function () {
    return gulp.src(buildFolder + '*.js')
        .pipe(gulp.dest(releaseFolder));
});

/**
 * Moving public files to release folder
 * */
gulp.task('build-public', ['clean-release'], function () {
    return gulp.src('./' + releasePublicFolderName + '/**')
        .pipe(gulp.dest(releaseFolder + releasePublicFolderName));
});

/**
 * Moving index.html to release folder and placing the right version of the application
 * */
gulp.task('build-version', ['clean-release', 'app-version'], function () {
    return gulp.src(indexFile)
        .pipe(htmlreplace({
            'release-css': 'styles.css',
            'release-js': 'bundle.js',
            'version-js': {
                src: [[appVersion.split("-")[0], appVersion]],
                tpl: "<script type='text/javascript'>APP_VERSION = '%s'; APP_VERSION_FULL = '%s'</script>"
            }
        }))
        .pipe(gulp.dest(releaseFolder));
});

/**
 * Deletion of build folder and
 * Building the production version
 * */
gulp.task('build:release', ['build-css', 'build-js', 'app-localizations', 'build-public', 'build-version'], function () {
    return gulp.src(buildFolder, {read: false})
        .pipe(clean());
});

gulp.task('webpack-dev-server', ['clean-build', 'app-localizations', 'clean-release', 'clean-cache'], function(callback) {
    var webpackDevConfig = Object.assign({}, require('./webpack.config.dev'));
    var compiler = webpack(webpackDevConfig);

    new WebpackDevServer(compiler, {
        publicPath: webpackDevConfig.output.publicPath,
        hot: true,
        historyApiFallback: true,
        headers: { 'X-Custom-Header': 'yes' },
        stats: { colors: true },
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        proxy: {
            '/gelf': 'http://127.0.0.1:12201',
            '/api/*': 'http://127.0.0.1:8080' //URL of the backend API
        }
    }).listen(webpackDevConfig.serverPort, webpackDevConfig.serverHost, function(err) {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        }

        gutil.log('[webpack-dev-server]', 'http://' + webpackDevConfig.serverHost + ':' + webpackDevConfig.serverPort + '/webpack-dev-server/index.html');
        callback(err);
    });
});