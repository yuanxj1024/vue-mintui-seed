var gulp = require('gulp');
var rimraf = require('rimraf');

var path = {
  static: [
    './app/src/images/**/*.*'
  ]
};

gulp.task('copy-to-dist', function () {
  rimraf.sync('./dist');
  return gulp.src(path.static, {
      base: 'app/src'
    })
    .pipe(gulp.dest('./dist'))
});

gulp.task('clean', function () {
  rimraf.sync('./dist');
});
