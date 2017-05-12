'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const colors = require('colors');
const nodeInspector = require('gulp-node-inspector');
const gulpsync = require('gulp-sync')(gulp);

gulp.task('watch', gulpsync.sync(['watch:fe', 'browser']));

//前端
gulp.task('watch:fe', function () {
  let watchList = [
    './client/**/*.*',
    './views/*.jade',
    './views/**/*.jade'
  ];

  gulp.watch(watchList, function(event) {
    let filetype = getFileType(event.path);
    console.log(colors.blue('File ' + event.type + ': ' + event.path));

    if (event.type == 'changed') {
      compileFile(filetype, event.path);
    } else {
      gulp.start(['inject:dev'], reloadBrowser);
    }
  });
});

/**
 *
 * 命令：gulp browser
 * 作用：启动浏览器
 *
 */
gulp.task('browser', function() {

  browserSync.init({
    proxy: 'http://localhost:3005'
  });

});

/**
 *
 * 命令：gulp server
 * 作用：运行服务端nodejs服务
 *
 */
/*gulp.task('server', function() {

  gulp.src(['./app.js'])
    .pipe(nodeInspector());
  console.log('server start');
  server.listen({
    path: './app.js'
  });

});*/

/**
 *
 * 刷新浏览器
 *
 */
function reloadBrowser() {

  setTimeout(browserSync.reload, 0);

}

/**
 * 重新运行nodejs进程
 */
/*function rerunServer() {

  setTimeout(server.restart, 0);

}*/

/**
 * 根据路径取得文件类型(后缀名)
 *
 * @param      {String}  path    The path
 * @return     {String}  The file type.
 */
function getFileType(path) {

  return path.substr(path.lastIndexOf('.') + 1);

}

/**
 * 根据路径取得文件名
 *
 * @param      {String}  path    The path
 * @return     {String}  The file name.
 */
function getFileName(path) {

  return path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));

}

/**
 * 根据文件名判断是否更新 jade
 *
 * @param      {String}  filname    The name of file
 * @return     {Boolean}  none
 */
function isLayout(filename) {
  return filename === 'layout' || filename === 'index';
}

/**
 * 根据不同的文件类型执行不同的编译命令
 *
 * @param      {String}  type    The type
 * @param      {String}  path    The path
 * @return     {fileStream}  返回文件流
 */
function compileFile(type, path) {

  switch (type) {

    case 'js': return gulp.start(['babel', 'lint:fe', 'inject:js:dev'], reloadBrowser);
    case 'sass': return gulp.start(['sass', 'inject:css:dev'], reloadBrowser);
    case 'jade': {
      if (isLayout(getFileName(path))) return gulp.start(['inject:dev'], reloadBrowser);
      else {
        reloadBrowser();
        return null;
      }
    }
  }

}
