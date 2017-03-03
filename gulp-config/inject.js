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
  let cssFiles = [
    './public/bower_components/bootstrap/dist/css/bootstrap.css',
    './public/bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
    './public/bower_components/codemirror/lib/codemirror.css',
    './public/bower_components/simplemde/dist/simplemde.min.css',
    './public/bower_components/highlight/src/styles/default.css',
    './public/bower_components/angular-ui-notification/dist/angular-ui-notification.min.css'
  ];

  return cssFiles.concat(files);
}

function getJsFiles(files) {
  let jsFiles = [
    './public/bower_components/angular/angular.js',
    './public/bower_components/angular-route/angular-route.js',
    './public/bower_components/angular-cookies/angular-cookies.js',
    './public/bower_components/angular-loader/angular-loader.js',
    './public/bower_components/angular-resource/angular-resource.js',
    './public/bower_components/angular-sanitize/angular-sanitize.js',
    './public/bower_components/angular-animate/angular-animate.js',
    './public/bower_components/jquery/dist/jquery.min.js',
    './public/bower_components/bootstrap/dist/js/bootstrap.js',
    './public/bower_components/moment/min/moment-with-locales.min.js',
    './public/bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
    './public/bower_components/codemirror/lib/codemirror.js',
    './public/bower_components/simplemde/dist/simplemde.min.js',
    './public/bower_components/marked/lib/marked.js',
    './public/bower_components/angular-ui-router/release/angular-ui-router.js',
    './public/bower_components/angular-file-upload/dist/angular-file-upload.min.js',
    './public/bower_components/angular-ui-notification/dist/angular-ui-notification.min.js',
    './public/bower_components/angular-md/dist/angular-md.min.js',
    './public/bower_components/angular-mocks/angular-mocks.js',
    './public/bower_components/highlight/src/highlight.js'
  ];

  return jsFiles.concat(files);
}

function indexExisted() {
  return fs.existsSync('./views/index.html');
}
