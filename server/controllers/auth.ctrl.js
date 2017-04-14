const co = require('co');
const md5 = require('md5');
const { user } = require('../models');
const { handleError, sendData, fieldsSelect, fieldsRename, coWrap } = require('../utils');

/**
 * 
 * @description 注册用 ctrl
 * @param {object} req 
 * @param {object} res 
 * @param {function} next
 * @author 邓廷礼 <mymikotomisaka@gmail.com>
 *  
 */
function * registerOneUser(req, res, next) {
  let data = req.body;
  let userMeta = {};

  try {
    userMeta = yield user.createOneUser(body);
  }
  catch (e) {
    return handleError(req, res, 'DATABASE_ERROR', e, '数据库出错，请联系管理员');
  }

  userMeta = fieldsSelect(userMeta, '_id username nickname');
  userMeta = fieldsRename(userMeta, { 'uid': '_id' });

  return sendData(req, res, 'OK', userMeta, '注册成功');
}

/**
 * 
 * @description 登录用 ctrl
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @author 邓廷礼 <mymikotomisaka@gmail.com>
 *  
 */
function * logInOneUser(req, res, next) {
  let data = req.body;
  let userMeta = {};

  try {
    userMeta = yield user.retrieveOneUser(data.username);
  }
  catch (e) {
    return handleError(req, res, 'DATABASE_ERROR', e, '数据库出错，请联系管理员');
  }

  userMeta = fieldsSelect(userMeta, '_id username nickname');
  userMeta = fieldsRename(userMeta, { 'uid': '_id' });

  return sendData(req,res, 'OK', userMeta, '登录成功');
}

module.exports = coWrap({
  logInOneUser,
  registerOneUser
});