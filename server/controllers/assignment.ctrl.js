const { assignment } = require('../models');
const { sendData, handleError, fieldsSelect, fieldsRename, coWrap } = require('../utils');
const { file } = require('../service');

function * retrieveAllAssignments(req, res, next) {
  let result = {};

  try {
    result = yield assignment.getAll();
  }
  catch (e) {
    return handleError(req, res, 'DATABASE_ERROR', e, '数据库错误，请联系管理员');
  }
  result = result.map(doc => fieldsRename(doc, { '_id': 'aid' }));

  return sendData(req, res, 'OK', result, '获取任务列表成功');
}

function * retrieveOneAssignment(req, res, next) {
  let aid = req.params.assignmentId;
  let result = {};

  try {
    result = yield assignment.getOne(aid);
  }
  catch (e) {
    return handleError(req, res, 'DATABASE_ERROR', e, '数据库错误，请联系管理员');
  }

  result = fieldsRename(result, { '_id': 'aid' });

  return sendData(req, res, 'OK', result, '获取任务成功');
}

function * createOneAssignment(req, res, next) {
  let newAssignment = req.body;
  let result = {};

  try {
    result = yield assignment.createOne(newAssignment);
  }
  catch (e) {
    return handleError(req, res, 'DATABASE_ERROR', e, '数据库错误，请联系管理员');
  }
  
  fieldsRename(result, { '_id': 'aid' });

  return sendData(req, res, 'OK', result, '创建任务成功');
}

function * submitOneFile(req, res, next) {
  let username = req.session.userMeta.username;
  let aid      = req.params.assignmentId;

  try {
    result = yield file.save(req, '/' + assignmentId, username + '.zip', true);
  }
  catch (e) {
    return handleError(req, res, 'FILE_SERVICE_ERROR', e, '文件存储失败，请联系管理员');
  }

  return sendData(req, res, 'OK', result, '文件上传成功');
}

module.exports = coWrap({
  retrieveAllAssignments,
  retrieveOneAssignment,
  createOneAssignment,
  submitOneFile
});