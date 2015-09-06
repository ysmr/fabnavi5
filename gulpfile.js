var gulp = require('gulp');
var browserify = require('gulp-browserify');
var reactify = require('reactify');
var sourcemaps = require('gulp-sourcemaps');

var SRC_CLIENT =  [
    'app/assets/javascripts/client/dispatcher/*',
    'app/assets/javascripts/client/stores/*',
    'app/assets/javascripts/client/constants/*',
    'app/assets/javascripts/client/actions/*',
    'app/assets/javascripts/client/main.js',
    'app/assets/javascripts/client/fabnavi.js',
    'app/assets/javascripts/client/application.js'
    ] ;

var DIST_CLIENT = "app/assets/javascripts/dist/client";

gulp.task('default', function(){
  gulp.src(SRC_CLIENT)
  .pipe(browserify({
    transform : ['reactify'],
    extensions: ['.js'],
    debug : true
  }))
  .pipe(gulp.dest(DIST_CLIENT))
});
