const db = require('../../mongodb/dbLink');
const resultModel = require('../../result_config/result');
const co = require('co');
const md5 = require('md5');

function isValid(data) {
  let valid = true;

  if (!/^[a-zA-Z][a-zA-Z0-9_]{5,17}$/.test(data.username)) valid = false;
  if (!/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,18}$/.test(data.password)) valid = false;
  if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(data.email)) valid = false;
  if (!/^[a-zA-Z\u4E00-\u9FA5][a-zA-Z0-9\u4E00-\u9FA5_]{2,15}$/.test(data.nickname)) valid = false;

  return valid;
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
            result.setSession = true;
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

  return co(function* () {
    yield new Promise((resolve, reject) => {
      db.user.find({
        username: data.username
      }, (err, data) => {
        if (err) {
          result.status = 'BAD_DATA';
          result.msg = '用户名已存在';
          reject(result);
        }
      });
    });

    yield new Promise((resolve, reject) => {
      db.user.find({
        email: data.email
      }, (err, data) => {
        if (err) {
          result.status = 'BAD_DATA';
          result.msg = '邮箱已存在';
          reject(result);
        }
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
          result.userData.username = data.username;
          result.userData.nickname = data.nickname;
          result.setSession = true;
        }
      })
    });

    return result;
  });
};

let userAPI = {};

userAPI.post = (req) => {
  if (userMethods[req.params.command]) return userMethods[req.params.command](req);
  else {
    let err = new resultModel();
    err.status = 'BAD_REQUEST';
    err.msg = '无法识别的请求';
    return Promise.reject(err);
  };
};

module.exports = userAPI;