var gulp = require('gulp');
var watchify = require('gulp-watchify');
var reactify = require('reactify');

var SRC_CLIENT =  [
    'app/assets/javascripts/client/dispatcher/*',
    'app/assets/javascripts/client/stores/*',
    'app/assets/javascripts/client/constants/*',
    'app/assets/javascripts/client/actions/*',
    'app/assets/javascripts/client/fabnavi.js'
    ] ;

var DIST_CLIENT = "app/assets/javascripts/dist/client";

gulp.task('default', watchify(function(watchify){
  return gulp.src(SRC_CLIENT)
  .pipe(watchify({
    transform : ['reactify'],
    extensions: ['.js'],
    debug : true,
    watching: true
  }))
  .pipe(gulp.dest(DIST_CLIENT));
}));
