/**
 * @description 和普通用户 profile 相关的 ctrl (头像上传、修改密码、修改昵称)
 * @author 邓廷礼 <mymikotomisaka@gmail.com>
 */

const co = require('co');
const { user } = require('../models');
const md5 = require('md5');
const { handleError, sendData, fieldsSelect, fieldsRename, coWrap } = require('../utils');
const imageMagick = require('imagemagick');
const fs = require('fs-promise');
const { file } = require('../service');

const profileDir = '/profiles';
/** 修改 profile 的接口（只允许修改昵称和密码
 * 
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
function * updateProfile(req, res, next) {
  let update = {},
      data = req.body;
  
  let uid = req.session.userMeta.uid;

  let result = null;
  
  if (data.nickname) update.nickname = data.nickname;
  if (data.password) update.password = md5(data.password);

  try {
    result = yield user.updateOne(uid, update);
    result = yield user.getOne(null, uid);
  }
  catch (e) {
    return handleError(req, res, 'DATABASE_ERROR', e, '数据库错误，请联系管理员');
  }

  if (result) {
    userMeta = fieldsSelect(result._doc, '_id username nickname email role');
    userMeta = fieldsRename(userMeta, { '_id': 'uid' });
    return sendData(req, res, 'OK', userMeta, '修改成功');
  }
  else
    return sendData(req, res, 'BAD_DATA', null, '修改失败，找不到用户');
}

/**获取头像(暂时不做)
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {function} next 
 */
function * getAvatar(req, res, next) {
  
}

/** 上传头像 (暂时不做)
 * 
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
function * uploadAvatar(req, res, next) {
  let uid = req.session.userMeta.uid,
      path = '',
      result = null,
      type = '';
      
  try {
    path = yield file.save(req, '/profiles/' + uid, null, true);
    type = req.file[0].originalFilename.split('.')[1];
    result = yield resizeAvatar(path, './files/profiles/' + uid + '.' + type);
  }
  catch (e) {
    return handleError(req, res, 'FILE_SERVICE_ERROR', e, '文件存储失败，请联系管理员');
  }

  return sendData(req, res, 'OK', result, '头像上传成功');
}

function resizeAvatar(path, dist) {
  return new Promise((resolve, reject) => {
    imageMagick.resize({
      srcPath: path,
      dstPath: dist,
      width: 200,
      height: 200,
    }, (err, stdout, stderr) => {
      if (err) reject(err);
      else resolve(stdout); 
    });
  });
}

module.exports = coWrap({
  updateProfile,
  uploadAvatar,
  getAvatar,
});
