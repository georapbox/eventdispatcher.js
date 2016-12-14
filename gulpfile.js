var gulp = require('gulp');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var header = require('gulp-header');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var fs = require('fs');
var pkg = require('./package.json');

var paths = {
  js: 'src/**/*.js'
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
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(header(banner, {pkg: pkg}))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});

gulp.task('writeBadges', function () {
  'use strict';

  var file = 'README.md';
  var data = fs.readFileSync(file);
  var badgesStr = pkg.badges.join(' ');
  var finalStr = badgesStr + '\n\n' + data.toString();

  fs.writeFileSync(file, finalStr, 'utf-8');
});
