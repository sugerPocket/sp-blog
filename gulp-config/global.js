'use strict';

const gulp = require('gulp');
const gulpsync = require('gulp-sync')(gulp);

//开发环境
gulp.task('sugerpocket:dev', gulpsync.sync(['inject:dev', 'watch']));
//正式环境
gulp.task('sugerpocket:pro', gulpsync.sync(['inject:pro']));
