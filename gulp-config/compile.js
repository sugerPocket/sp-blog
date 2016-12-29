'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const gulpsync = require('gulp-sync')(gulp);

/*
* 编译文件
*/

gulp.task('compile:pro', gulpsync.sync(['clean:code', 'sass', 'babel']));

gulp.task('compile:dev', gulpsync.sync(['clean:code', 'lint', 'sass', 'babel']));

gulp.task('sass', function () {
  return gulp.src('./blog-fe/**/*.sass')
    .pipe(sass({ outputStyle: 'expanded' })
      .on('error', sass.logError))
    .pipe(gulp.dest('./public/app'));
});

gulp.task('babel', function () {
  return gulp.src('./blog-fe/**/*.js')
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('./public/app'));
});
