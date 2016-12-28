'use strict';

const gulp = require('gulp');
const del = require('del');

gulp.task('clean', ['clean:code', 'clean:log']);

gulp.task('clean:log', function() {
  return del.sync('./*.log');
});

gulp.task('clean:code', function() {
  let codePath = [
    './views/index.html',
    './public/app/',
    './public/dist/'
  ];
  return del.sync(codePath);
});
