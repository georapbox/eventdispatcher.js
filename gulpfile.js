var gulp = require('gulp');
var eslint = require('gulp-eslint');

var paths = {
  js: 'src/**/*.js'
};

gulp.task('lint', function () {
  'use strict';

  return gulp.src([paths.js, '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
