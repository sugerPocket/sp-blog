const db = require('../../mongodb/dbLink');
const resultModel = require('../../result_config/result');
const co = require('co');
const fs = require('fs');
const multiparty = require('multiparty');
const express = require('express');
const router = express.Router();

function fileValidator(username, file) {
  
}

function assignmentValidator(assignment, userMeta) {
  let msg = '';
  assignment.ddl = new Date(assignment.ddl);
  assignment.week = Number(assignment.week);
  assignment.promulgatorId = userMeta.uid;
  return msg;
}

function getAssignmentDetail(doc) {
  return {
    aid: doc._id,
    start: doc.start,
    title: doc.title,
    ddl: doc.ddl,
    type: doc.type,
    week: doc.week,
    promulgatorMeta: doc.promulgatorMeta,
    content: doc.content,
    fileEntry: doc.fileEntry
  };
}

function getUserDetail(doc) {
  return {
    username: doc.username,
    nickname: doc.nickname,
    role: doc.role
  };
}

function createOneAssignment(req) {
  let result = new resultModel();
  let assignment = req.body;
  let userMeta = req.session.userMeta;

  result.msg = assignmentValidator(assignment, userMeta);

  if (result.msg) {
    result.status = 'BAD_DATA';
    return Promise.reject(result);
  }

  return co(function * () {
    yield new Promise((resolve, reject) => {
      let newAssignment = db.assignment(assignment);
      newAssignment.save((err, docs) => {
        if (err) {
          result.status = 'DATABASE_ERROR';
          result.msg = '数据库出现未知错误';
          reject(result);
        }
        else {
          result.status = 'OK';
          result.msg = '创建新任务成功';
          result.userMeta = getUserDetail(req.session.userMeta);
          resolve(result);
        }
      });
    });

    return result;
  });
}

function getOneAssignment(req) {
  let assignmentId = req.params.assignmentId;
  let result = new resultModel();

  return co(function *() {
    let assignmentMeta = {};

    yield new Promise((resolve, reject) => {
      db.assignment.find({
        _id: assignmentId
      }, (err, docs) => {
        if (err) {
          result.status = 'DATABASE_ERROR';
          result.msg = '数据库出现未知错误';
          reject(result);
        }
        else if (docs.length === 0) {
          result.status = 'BAD_DATA';
          result.msg = '无法获取当前任务';
          reject(result);
        }
        else {
          assignmentMeta = docs[0]._doc;
          resolve(result);
        }
      });
    });

    yield new Promise((resolve, reject) => {
      db.user.find({
        _id: assignmentMeta.promulgatorId
      }, (err, docs) => {
        if (err) {
          result.status = 'DATABASE_ERROR';
          result.msg = '数据库出现未知错误';
          reject(result);
        }
        else if (docs.length === 1) {
          result.status = 'OK';
          result.msg = '获取任务描述成功';
          assignmentMeta.promulgatorMeta = getUserDetail(docs[0]._doc);
          result.data = getAssignmentDetail(assignmentMeta);
          resolve(result);
        }
        else {
          result.status = 'BAD_DATA';
          result.msg = '无法获取当前任务';
          reject(result);
        }
      });
    });

    return result;
  });
}

function getAllAssignments(req) {
  let result = new resultModel();

  return co(function *() {
    let userLists = {};
    yield new Promise((resolve, reject) => {
      db.user.find({}, (err, docs) => {
        if (err) {
          result.status = 'DATABASE_ERROR';
          result.msg = '数据库出现未知错误';
          reject(result);
        }
        else {
          Array.prototype.forEach.call(docs, (doc, index, arr) => userLists[doc._doc._id] =  getUserDetail(doc._doc));
          resolve(result);
        }
      });
    });

    yield new Promise((resolve, reject) => {
      db.assignment.find({}).sort({'_id': -1}).exec((err, docs) => {
        if (err) {
          result.status = 'DATABASE_ERROR';
          result.msg = '数据库出现未知错误';
          reject(result);
        }
        else {
          result.status = 'OK';
          result.msg = '获取任务列表成功';
          result.data = 
            Array.prototype.map.call(docs, (instance, index, arr) => {
              return {
                aid: instance._doc._id,
                start: instance._doc.start,
                title: instance._doc.title,
                ddl: instance._doc.ddl,
                type: instance._doc.type,
                week: instance._doc.week,
                promulgatorMeta: userLists[instance._doc.promulgatorId]
              };
            });
          resolve(result);
        }
      });
    });

    return result;
  });
}

function submitFile(req) {
  let result = new resultModel();
  let assignmentId = req.params.assignmentId;
  let username = req.session.userMeta.username;
  let url = './files/assignment/' + assignmentId + '/';
  let form = new multiparty.Form({uploadDir: url});

  return co(function *() {
    let exists = yield new Promise((resolve, reject) => {
      fs.exists(url, exists => resolve(exists));
    });

    if (!exists) {
      yield new Promise((resolve, reject) => {
        fs.mkdir(url, err => {
          if (err) {
            result.status = 'OS_ERROR';
            result.msg = '文件夹创建失败，请联系管理员';
            reject(result);
          }
          else resolve(result);
        });
      });
    }

    let tmpFile = yield new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          result.status = 'OS_ERROR';
          result.msg = '文件存储失败，请联系管理员';
          reject(result);
        }
        else {
          resolve({
            originalFilename: files.file[0].originalFilename,
            path: files.file[0].path
          });
        }
      });
    });

    yield new Promise((resolve, reject) => {
      let extension = tmpFile.originalFilename.split('.')[1];
      let filename = username;
      if (extension) filename = filename + '.' + extension;
      let path = url + filename;

      fs.rename(tmpFile.path, path, err => {
        if (err) {
          result.status = 'OS_ERROR';
          result.msg = '文件存储失败，请联系管理员';
          reject(result);
        }
        else {
          result.status = 'OK';
          result.msg = '文件上传成功';
          result.userMeta = getUserDetail(req.session.userMeta);
          resolve(result);
        }
      });
    });

    return result;
  });
}

function setResponse(req, res, callback) {
  callback(req)
    .then(result => res.end(JSON.stringify(result)))
    .catch(err => res.end(JSON.stringify(err)));
}

router.get('/one/:assignmentId', (req, res, next) => {
  setResponse(req, res, getOneAssignment);
});

router.get('/list', (req, res) => {
  setResponse(req, res, getAllAssignments);
});

router.post('/one/:assignmentId/file', (req, res, next) => {
  setResponse(req, res, submitFile);
});

router.post('/new', (req, res, next) => {
  setResponse(req, res, createOneAssignment);
});

module.exports = router;