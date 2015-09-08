var gulp = require('gulp');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var fromArgs = require('watchify/bin/args');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var assign = require('lodash').assign;
var glob = require('glob');

var SRC_CLIENT =  [
/*
    'app/assets/javascripts/client/dispatcher/*',
    'app/assets/javascripts/client/stores/*',
    'app/assets/javascripts/client/constants/*',
    'app/assets/javascripts/client/actions/*',
    */
    glob.sync('app/assets/javascripts/client/**/*.js'),
    'app/assets/javascripts/client/fabnavi.js'
    ] ;

var DIST_CLIENT = "app/assets/javascripts/dist/client";


var options = assign({}, watchify.args, {
    transform : ['reactify'],
    extensions: ['.js'],
    debug : true,
    poll  : true,
    entries : SRC_CLIENT
});


gulp.task('build', build);
gulp.task('start', watch);

function watch(){
  var b = watchify(browserify(options));
  bundle();
  b.on('log', gutil.log);
  b.on('update', bundle);
  b.on('data', bundle);
  b.on('error', gutil.log.bind(gutil, 'Browserify Error'));

  function bundle(){
    return b.bundle()
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(plumber())
    .pipe(sourcemaps.init({loadMaps: true})) 
    .pipe(sourcemaps.write('./')) 
    .pipe(gulp.dest(DIST_CLIENT));
  }
}

function build(){
  var b = browserify(options);
  return b.bundle()
  .on('log', gutil.log)
  .on('error', gutil.log.bind(gutil, 'Browserify Error'))
  .pipe(source("bundle.js"))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest(DIST_CLIENT));
}

