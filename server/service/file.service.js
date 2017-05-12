const fs = require('fs-promise');
const co = require('co');
const multiparty = require('multiparty');
const { coWrap } = require('../utils');

const fileDir = 'files';

function parseFile(req, form) {
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      req.file = files.file;
      resolve(files.file);
    });
  });
}

function * save(req, path, name, single) {
  let url = fileDir + (path[0] === '/' ? '' : '/') + path;
  let access = false;
  try {
    yield co.wrap(mkdir)(url);
    access = yield fs.exists(url);
  }
  catch(e) {
    console.log(e);
  }
  if (!access) return Promise.reject('cannot make dir: ' + path);

  let form = new multiparty.Form({uploadDir: url});

  let files = yield parseFile(req, form);
  let oldPath = files[0].path;

  if (typeof name === 'string') 
    yield fs.rename(oldPath, url + '/' + name);
  
  return typeof name !== 'string' ? oldPath : url + '/' + name;
}

/** 创建路径服务
 * 
 * @author 邓廷礼 <mymikotomisaka@gmail.com>
 * @param {String} path
 * 
 */
function * mkdir(path) {
  let directorys = path.split('/');
  if (!directorys[0]) directorys.shift();

  path = '';
  try {
    for (let i = 0; i < directorys.length; i++) {
      path += (directorys[i] + '/');
      let access = yield fs.exists(path);
      if (!access)
        yield fs.mkdir(path);
    };
  }
  catch (e) {
    return false;
  }

  return true;
}

module.exports = coWrap({
  save,
  mkdir,
});

