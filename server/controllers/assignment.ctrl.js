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

  result = assignmentDocsPicker(result);
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

  result = assignmentDocPicker(result._doc);

  return sendData(req, res, 'OK', result, '获取任务成功');
}

function * createOneAssignment(req, res, next) {
  let newAssignment = req.body;
  newAssignment.promulgatorId = req.session.userMeta.uid;
  let result = {};

  try {
    result = yield assignment.createOne(newAssignment);
  }
  catch (e) {
    return handleError(req, res, 'DATABASE_ERROR', e, '数据库错误，请联系管理员');
  }
  
  result = assignmentDocPicker(result[0]._doc);

  return sendData(req, res, 'OK', result, '创建任务成功');
}

function * submitOneFile(req, res, next) {
  let username = req.session.userMeta.username;
  let aid      = req.params.assignmentId;

  try {
    result = yield file.save(req, '/assignments/' + aid, username + '.zip', true);
  }
  catch (e) {
    return handleError(req, res, 'FILE_SERVICE_ERROR', e, '文件存储失败，请联系管理员');
  }

  return sendData(req, res, 'OK', result, '文件上传成功');
}

function * editOneAssignment(req, res, next) {
  let newAssignment = req.body;
  let aid = req.params.assignmentId;
  let result = {};

  try {
    result = yield assignment.updateOne(newAssignment);
  }
  catch (e) {
    return handleError(req, res, 'DATABASE_ERROR', e, '数据库错误，请联系管理员');
  }
  
  result = assignmentDocPicker(result._doc);

  return sendData(req, res, 'OK', result, '修改成功');
}

module.exports = coWrap({
  retrieveAllAssignments,
  retrieveOneAssignment,
  createOneAssignment,
  submitOneFile
});

function assignmentDocsPicker(docs) {
  return docs.map(item => assignmentDocPicker(item._doc));
}

function assignmentDocPicker(doc) {
  let result = Object.assign({}, doc);

  result = fieldsRename(result, { 'promulgatorId' : 'promulgatorMeta', '_id' : 'aid' });
  if (result.promulgatorMeta && result.promulgatorMeta._doc) result.promulgatorMeta = fieldsRename(result.promulgatorMeta._doc, { '_id' : 'uid' });
  return result;
}