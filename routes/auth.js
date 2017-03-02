const db = require('../mongodb/dbLink');
const resultModel = require('../result_config/result');
const co = require('co');
const md5 = require('md5');
const express = require('express');
const router = express.Router();

function isValid(data) {
  let valid = true;

  if (!/^[a-zA-Z0-9_]{6,18}$/.test(data.username)) valid = false;
  if (!/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,18}$/.test(data.password)) valid = false;
  if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(data.email)) valid = false;
  if (!/^[a-zA-Z\u4E00-\u9FA5][a-zA-Z0-9\u4E00-\u9FA5_]{2,15}$/.test(data.nickname)) valid = false;

  return valid;
}

function setSession(req, result) {
  if (result.status === 'OK') {
    req.session.userMeta = result.userMeta;
  }
}

let userMethods = {};

userMethods.login = (req) => {
  let result = new resultModel();
  let data = req.body;
  if (!data.username || !data.password) {
      result.status = 'BAD_DATA';
      result.msg = '请保证数据的完整性';
      return Promise.reject(result);
  }

  data.password = md5(data.password);

  return co(function* () {
    yield new Promise((resolve, reject) => {
      db.user.find({
        username: data.username,
        password: data.password
      }, (err, docs) => {
        if (err) {
          result.status = 'DATABASE_ERROR';
          result.msg = '数据库出现未知错误';
          reject(result);
        }
        else {
          if (docs.length === 1) {
            result.status = 'OK';
            result.msg = '用户登录成功';
            result.userMeta.username = docs[0]._doc.username;
            result.userMeta.nickname = docs[0]._doc.nickname;
            result.userMeta.role = docs[0]._doc.role;
            resolve(result);
          }
          else {
            result.status = 'AUTHENTICATION_ERROR';
            result.msg = '用户名或密码错误';
            reject(result);
          }
        }
      });
    });

    return result;
  });
};

userMethods.register = (req) => {
  let result = new resultModel();
  let data = req.body;
  if (!data.username || !data.password || !data.email || !data.nickname) {
    result.status = 'BAD_DATA';
    result.msg = '请保证数据的完整性';
    return Promise.reject(result);
  }

  if (!isValid(data)) {
    result.status = 'BAD_DATA';
    result.msg = '数据格式不正确';
    return Promise.reject(result);
  }

  data.password = md5(data.password);
  data.role = 1;

  return co(function* () {
    yield new Promise((resolve, reject) => {
      db.user.find({
        username: data.username
      }, (err, docs) => {
        if (err) {
          result.status = 'DATABASE_ERROR';
          result.msg = '数据库出现未知错误';
          reject(result);
        }
        else if (docs.length > 0) {
          result.status = 'BAD_DATA';
          result.msg = '用户名已存在';
          reject(result);
        }
        else resolve(result);
      });
    });

    yield new Promise((resolve, reject) => {
      db.user.find({
        email: data.email
      }, (err, docs) => {
        if (err) {
          result.status = 'DATABASE_ERROR';
          result.msg = '数据库出现未知错误';
          reject(result);
        }
        else if (docs.length > 0) {
          result.status = 'BAD_DATA';
          result.msg = '邮箱已存在';
          reject(result);
        }
        else resolve(result);
      });
    });

    yield new Promise((resolve, reject) => {
      let newUser = new db.user(data);
      newUser.save(err => {
        if (err) {
          result.status = 'DATABASE_ERROR';
          result.msg = '数据库出现未知错误';
          reject(result);
        }
        else {
          result.status = 'OK';
          result.msg = '新用户注册成功';
          result.userMeta.username = data.username;
          result.userMeta.nickname = data.nickname;
          result.userMeta.role = data.role;
          resolve(result);
        }
      })
    });

    return result;
  });
};

router.post('/:command', (req, res, next) => {
  if (userMethods[req.params.command]) 
    userMethods[req.params.command](req)
      .then(result => {
        setSession(req, result);
        res.end(JSON.stringify(result));
      })
      .catch(err => res.end(JSON.stringify(err)));
  else {
    let err = new resultModel();
    err.status = 'BAD_REQUEST';
    err.msg = '无法识别的请求';
    res.end(err);
  };
});

module.exports = router;