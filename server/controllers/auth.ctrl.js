/**
 * 
 * @description 为用户授权用的 ctrl
 * @author 邓廷礼 <mymiktomisaka@gmail.com>
 * 
 */

const co = require('co');
const md5 = require('md5');
const { user } = require('../models');
const { handleError, sendData, fieldsSelect, fieldsRename, coWrap } = require('../utils');

/** 注册用 ctrl
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {function} next
 * @author 邓廷礼 <mymikotomisaka@gmail.com>
 *  
 */
function * registerOneUser(req, res, next) {
  let data = req.body;
  let userMeta = {};
  
  data.password = md5(data.password);
  try {
    userMeta = yield user.createOne(data);
  }
  catch (e) {
    return handleError(req, res, 'DATABASE_ERROR', e, '数据库出错，请联系管理员');
  }

  userMeta = fieldsSelect(userMeta[0]._doc, '_id username nickname email role');
  userMeta = fieldsRename(userMeta, { '_id': 'uid' });

  return sendData(req, res, 'OK', userMeta, '注册成功');
}

/** 登录用 ctrl
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @author 邓廷礼 <mymikotomisaka@gmail.com>
 *  
 */
function * logInOneUser(req, res, next) {
  let data = req.body;
  let userMeta = {};
  
  data.password = md5(data.password);
  try {
    userMeta = yield user.getOne(data.username);
  }
  catch (e) {
    return handleError(req, res, 'DATABASE_ERROR', e, '数据库出错，请联系管理员');
  }
  if (!userMeta || data.password !== userMeta.password)
    return sendData(req, res, 'AUTHENTICATION_ERROR', null, '用户名或者密码错误');
  userMeta = fieldsSelect(userMeta, '_id username nickname email role');
  userMeta = fieldsRename(userMeta, { '_id': 'uid' });

  req.session.userMeta = userMeta;

  return sendData(req, res, 'OK', userMeta, '登录成功');
}

/** 之前判断过是否登陆，这里是取回数据返回的 ctrl
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @author 邓廷礼 <mymikotomisaka@gmail.com>
 *  
 */
function * authInit(req, res, next) {
  let userMeta = req.session.userMeta;

  userMeta = fieldsSelect(userMeta, 'uid username nickname email role');

  return sendData(req, res, 'OK', userMeta, '登录成功');
}

module.exports = coWrap({
  logInOneUser,
  registerOneUser,
  authInit
});