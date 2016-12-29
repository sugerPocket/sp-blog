'use strict';

const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify');
const gulpsync = require('gulp-sync')(gulp);

gulp.task('minify', gulpsync.sync(['compile:pro', 'minify:css', 'minify:js']));

/**
 *
 * 命令：gulp minify:css
 * 作用：压缩css文件，添加浏览器兼容性前缀，添加版本号
 *
 */
gulp.task('minify:css', function() {

  return gulp.src('./public/app/**/*.css')
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(concat('sugerpocket.min.css'))
    .pipe(rev())
    .pipe(gulp.dest('./public/dist/'));

});

/**
 *
 * 命令：gulp minify:js
 * 作用：压缩js文件，添加版本号
 *
 */
gulp.task('minify:js', function() {

  return gulp.src('./public/app/**/*.js')
    .pipe(uglify())
    .pipe(concat('sugerpocket.min.js'))
    .pipe(rev())
    .pipe(gulp.dest('./public/dist/'));

});
