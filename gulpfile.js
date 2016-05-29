import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import gulp from 'gulp';
import notify from 'gulp-notify';
import uglify from 'gulp-uglify';
import gutil from 'gulp-util';
import nodemon from 'nodemon';
import package from './package.json';
import source from 'vinyl-source-stream';

gulp.task('bundle', function() {
  function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
      title: 'Compile Error',
      message: '<%= error.message %>'
    }).apply(this, args);
    this.emit('end'); // Keep gulp from hanging on this task
  }

  function handleUpdate() {
    gutil.log('Rebundle...');
  }

  return browserify(package.paths.app)
    .transform('babelify', {presets: ['es2015', 'react']})
    .bundle()
    .on('update', handleUpdate)
    .on('error', handleErrors)
    .pipe(source(package.dest.app))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(package.dest.dist));
});

gulp.task('watch', function () {
  gulp.watch(['src/**/*.js', 'src/**/*.jsx'],['bundle']);
});

gulp.task('nodemon', function() {
  nodemon({
    script: 'app', ext: 'js jsx jade', ignore: ['public/scripts/react/*']
  })
  .on('restart', function() {
      gutil.log('Restarted server with changes...');
  });
});

gulp.task('default', ['bundle', 'watch', 'nodemon']);
