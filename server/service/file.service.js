const bluebird = require('bluebird');
const fs = require('fs');
const multiparty = require('multiparty');
const { coWrap } = require('../utils');

const fileDir = './files';

function parseFile(req) {
  return new Promise(() => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve(files.file);
    });
  });
}

function *save(req, path, name, single) {
  let url = fileDir + path;

  let access = yield fs.access(url);
  if (!access) sendData(req)

  let form = new multiparty.Form({uploadDir: url});

  let files = yield parseFile(req);
  let oldPath = url + '/' + files[0].originalFilename;

  if (typeof name !== 'string') 
    yield fs.rename(oldPath, url + '/' + name);
  
  return typeof name !== 'string' ? oldPath : url + '/' + name;
}

module.exports = coWrap({
  save
});

