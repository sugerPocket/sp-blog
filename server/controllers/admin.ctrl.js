/**
 * 
 * @description 管理员管理用户相关 ctrl
 * @author 邓廷礼 <mymikotomisaka@gmail.com>
 * 
 */

const co = require('co');
const { user } = require('../models');
const { handleError, sendData, fieldsSelect, fieldsRename, coWrap } = require('../utils');

/** 删除用户
 *
 * @param {Request} req 
 * @param {Response} res 
 * @param {function} next 
 */
function * deleteOneUser(req, res, next) {
  let uid = req.params.uid;

  try {
    result = user.removeOne(uid, update);
  }
  catch (e) {
    return handleError(req, res, 'DATABASE_ERROR', e, '数据库错误，请联系管理员');
  }

  return sendData(req, res, 'OK', result, '删除成功');
}

/** 更新用户信息(只能修改 username 与 password)
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {function} next 
 */
function * updateOneUser(req, res, next) {
  let update = {},
      data = req.body;
  
  let uid = req.params.uid;

  let result = null;
  
  if (data.username) update.username = data.username;
  if (data.password) update.password = data.password;

  try {
    result = user.updateOne(uid, update);
  }
  catch (e) {
    return handleError(req, res, 'DATABASE_ERROR', e, '数据库错误，请联系管理员');
  }

  return sendData(req, res, 'OK', result, '修改成功');
}


module.exports = {
  deleteOneUser,
  updateOneUser,
};