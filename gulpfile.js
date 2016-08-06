var gulp = require('gulp');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var header = require('gulp-header');
var rename = require('gulp-rename');
var pkg = require('./package.json');

var paths = {
  js: 'src/eventDispatcher.js'
};

var banner = [
  '/**',
  ' * <%= pkg.name %>',
  ' * <%= pkg.description %>',
  ' *',
  ' * @version v<%= pkg.version %>',
  ' * @author <%= pkg.author %>',
  ' * @homepage <%= pkg.homepage %>',
  ' * @repository <%= pkg.repository.url %>',
  ' */',
  ''
].join('\n');

gulp.task('lint', function () {
  'use strict';

  return gulp.src([paths.js, '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('uglify', function () {
  'use strict';

  return gulp.src(paths.js)
    .pipe(uglify())
    .pipe(header(banner, {pkg: pkg}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'));
});
