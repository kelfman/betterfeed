var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var nodemon = require('nodemon');
var package = require('./package.json');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');

gulp.task('bundle', function() {
  function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
      title: 'Compile Error',
      message: '<%= error.message %>'
    }).apply(this, args);
    this.emit('end'); // Keep gulp = require(hanging on this task
  }

  browserify(package.paths.app)
    .transform(babelify, {presets: ['es2015', 'react', 'stage-0']})
    .bundle()
    .on('error', handleErrors)
    .pipe(source(package.dest.bundle))
    // .pipe(buffer())
    // .pipe(uglify())
    .pipe(gulp.dest(package.dest.dist));

  gulp.src(package.paths.cssIdx)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(package.dest.css));
});

gulp.task('watch', function () {
  gulp.watch(['src/**/*.js', 'src/**/*.jsx', 'src/**/*.scss'], ['bundle']);
});

gulp.task('nodemon', function() {
  nodemon({
    script: 'bin/www', ext: 'js jsx jade', ignore: [package.dest.dist+'/*']
  });
});

gulp.task('default', ['bundle', 'watch', 'nodemon']);
