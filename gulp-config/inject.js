'use strict';

const gulp = require('gulp');
const inject = require('gulp-inject');
const jade = require('gulp-jade');
const fs = require('fs');
const gulpsync = require('gulp-sync')(gulp);

//开发
gulp.task('inject:dev', gulpsync.sync(['compile:dev', 'inject:css:dev', 'inject:js:dev']));

gulp.task('inject:css:dev', function() {

  let cssFiles = getCssFiles(['./public/app/**/*.css']);

  return startInject(cssFiles);
});

gulp.task('inject:js:dev', function() {
  
  let jsFiles = getJsFiles(['./public/app/**/*.js']);

  return startInject(jsFiles);
});

//正式
gulp.task('inject:pro', gulpsync.sync(['minify', 'inject:css:pro', 'inject:js:pro']));

gulp.task('inject:css:pro', function() {

  let cssFiles = getCssFiles(['./public/dist/**/*.css']);

  return startInject(cssFiles);
});

gulp.task('inject:js:pro', function() {
  
  let jsFiles = getJsFiles(['./public/dist/**/*.js']);

  return startInject(jsFiles);
});

/**
 * 开始注入
 *
 * @param      {Array}  files    所有的file
 * @return     {fileStream}  返回文件流
 */
function startInject(files) {
  //目标文件
  let target = null;
  if (!indexExisted()) {
    target = gulp.src('./views/index.jade')
      .pipe(jade());
  } else {
    target = gulp.src('./views/index.html');
  }
  //源文件
  let sources = gulp.src(files, { read: false });
  let options = {
    transform(filepath) {
      if (filepath.substr(0, 7) === '/public') {
        arguments[0] = filepath.substr(7);
      }
      // Use the default transform as fallback:
      return inject.transform.apply(inject.transform, arguments);
    }
  };

  return target
    .pipe(inject(sources, options))
    .pipe(gulp.dest('./views/'));

}

function getCssFiles(files) {
  let cssFiles = [];

  return cssFiles.concat(files);
}

function getJsFiles(files) {
  let jsFiles = [
    './public/bower_components/angular/angular.js',
    './public/bower_components/angular-route/angular-route.js',
    './public/bower_components/angular-cookies/angular-cookies.js',
    './public/bower_components/angular-loader/angular-loader.js',
    './public/bower_components/angular-resource/angular-resource.js',
    './public/bower_components/angular-sanitize/angular-sanitize.js'
  ];

  return jsFiles.concat(files);
}

function indexExisted() {
  return fs.existsSync('./views/index.html');
}
