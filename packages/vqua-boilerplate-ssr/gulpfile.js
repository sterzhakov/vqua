const gulp = require('gulp')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const merge = require('merge-stream')


gulp.task('styles', () => {

  const scssStream = gulp.src(['./build/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('scss-files.scss'))

  const cssStream = gulp.src(['./build/**/*.css'])
    .pipe(concat('css-files.css'))

  const mergedStream = merge(scssStream, cssStream)
    .pipe(concat('index.css'))
    .pipe(gulp.dest('./dist'))

  return mergedStream

})


gulp.task('styles:watch', () => {
  gulp.watch(['build/**/*.scss','build/**/*.css'],{ cwd: './' }, ['styles'])
})

gulp.task('default', [ 'styles', 'styles:watch' ])
