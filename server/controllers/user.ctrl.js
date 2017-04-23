/**
 * @description 和普通用户 profile 相关的 ctrl (头像上传、修改密码、修改昵称)
 * @author 邓廷礼 <mymikotomisaka@gmail.com>
 */

const co = require('co');
const { user } = require('../models');
const { handleError, sendData, fieldsSelect, fieldsRename, coWrap } = require('../utils');

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
  
  let uid = req.params.uid;

  let result = null;
  
  if (data.nickname) update.nickname = data.nickname;
  if (data.password) update.password = data.password;

  try {
    result = user.updateOne(uid, update);
  }
  catch (e) {
    return handleError(req, res, 'DATABASE_ERROR', e, '数据库错误，请联系管理员');
  }

  return sendData(req, res, 'OK', result, '修改成功');
}

/**获取头像(暂时不做)
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {function} next 
 */
function * getAvatar(req, res, next) {
  let username = req.session.username;
  
  
}

/** 上传头像 (暂时不做)
 * 
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
function * uploadAvatar(req, res, next) {
  
}


module.exports = {
  updateProfile,
  uploadAvatar,
};
