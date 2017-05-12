/**
 * 
 * @description 管理员管理用户相关 ctrl
 * @author 邓廷礼 <mymikotomisaka@gmail.com>
 * 
 */

const co = require('co');
const { user } = require('../models');
const md5 = require('md5');
const { handleError, sendData, fieldsSelect, fieldsRename, coWrap } = require('../utils');

/** 删除用户
 *
 * @param {Request} req 
 * @param {Response} res 
 * @param {function} next 
 */
function * deleteOneUser(req, res, next) {
  let uid = req.params.uid;
  let adminId = req.session.userMeta.uid;

  let result;
  try {
    result = yield user.getOne(null, uid);
    if (!result || !result._doc)
      return sendData(req, res, 'BAD_DATA', null, '用户不存在');
    if (result._doc.role) 
      return sendData(req, res, 'BAD_DATA', null, '不能删除管理员');
    result = yield user.removeOne(uid);
  }
  catch (e) {
    return handleError(req, res, 'DATABASE_ERROR', e, '数据库错误，请联系管理员');
  }

  if (result) {
    userMeta = fieldsSelect(result._doc, '_id username nickname role email');
    userMeta = fieldsRename(userMeta, { '_id': 'uid' });
    return sendData(req, res, 'OK', userMeta, '删除成功');
  }
  else
    return sendData(req, res, 'BAD_DATA', null, '删除失败，找不到用户');
}

/** 获取用户展示信息
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {function} next 
 */
function * getAllUsers(req, res, next) {
  let result = null;

  try {
    result = yield user.getAll();
  }
  catch (e) {
    return handleError(req, res, 'DATABASE_ERROR', e, '数据库错误，请联系管理员');
  }

  result = result.map(item => fieldsSelect(fieldsRename(item._doc, { '_id' : 'uid' }), 'uid username nickname email role'));

  return sendData(req, res, 'OK', result, '获取所有用户展示信息成功');
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
  
  let uid = data.uid;

  let result = null;
  
  if (data.username) update.username = data.username;
  if (data.password) update.password = md5(data.password);

  try {
    result = yield user.updateOne(uid, update);
    result = yield user.getOne(null, uid);
  }
  catch (e) {
    return handleError(req, res, 'DATABASE_ERROR', e, '数据库错误，请联系管理员');
  }

  if (result) {
    userMeta = fieldsSelect(result._doc, '_id username nickname role email');
    userMeta = fieldsRename(userMeta, { '_id': 'uid' });
    return sendData(req, res, 'OK', userMeta, '修改成功');
  }
  else
    return sendData(req, res, 'BAD_DATA', null, '修改失败，找不到用户');
}


module.exports = coWrap({
  deleteOneUser,
  updateOneUser,
  getAllUsers,
});