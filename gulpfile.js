var gulp = require('gulp');
var rimraf = require('rimraf');

var path = {
  static: [
    './app/images/**/*.*'
  ]
};

gulp.task('build', function () {
  rimraf.sync('./app/www');
  return gulp.src([
      'app/images/**/*.*'
    ], {
      base: 'app/'
    })
    .pipe(gulp.dest('app/www/'))
});
gulp.task('copy-to-dist', function () {
  rimraf.sync('./dist');
  return gulp.src(path.static, {
      base: 'app'
    })
    .pipe(gulp.dest('./dist'))
});

gulp.task('clean', function () {
  rimraf.sync('./dist');
});
