'use strict';

const gulp = require('gulp');

//开发环境
gulp.task('sugerpocket:dev', ['inject:dev', 'watch']);
//正式环境
gulp.task('sugerpocket:pro', ['inject:pro']);
