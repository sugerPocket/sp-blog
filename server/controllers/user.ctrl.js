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
const url = require('url');
const path = require('path');

const profileDir = 'profiles/';
const fileDir = 'files/';

const avatarTypes = ['jpg', 'jpeg', 'png'];

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
  const { uid } = url.parse(req.url, true).query;
  let avatarPath = '';
  let root = path.join(__dirname + '/../../');
  try {
    for (let i = 0; i < avatarTypes.length; i++) {
      let tempPath = `${fileDir}${profileDir}${uid}/${uid}.${avatarTypes[i]}`;
      console.log(tempPath);
      if (yield fs.exists(tempPath)) {
        avatarPath = tempPath;
      }
    }
  }
  catch (e) {
    res.sendFile('public/images/header.jpeg' , { root });
  }

  if (avatarPath)
    res.sendFile(avatarPath, { root });
  else
    res.sendFile('public/images/header.jpeg' , { root });
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
    path = yield file.save(req, `/${profileDir}${uid}`, null, true);
    type = req.file[0].originalFilename.split('.')[1];
    if (avatarTypes.indexOf(type) === -1) {
      result = yield fs.remove(path);
      return sendData(req, res, 'BAD_DATA', result, '头像上传失败，必须为 png、jpg 或者 jpeg 格式图像');
    }
    result = yield resizeAvatar(path, `${fileDir}${profileDir}${uid}.${type}`);
    result = yield fs.rename(req.file[0].path, path.substring(0, path.lastIndexOf('/') + 1) + uid + '.' + type);
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
      dstPath: path,
      width: 400,
      height: 400,
      quality: 60
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
