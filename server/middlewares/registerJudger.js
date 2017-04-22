const { sendData } = require('../utils');
const co = require('co');
const { isRedefined } = require('../models/user');

function * registerJudger(req, res, next) {
  let user = req.body;

  if (yield isRedefined(user)) return sendData(req, res, 'BAD_DATA', null, '用户名或邮箱已存在');
  else return next();
}

module.exports = co.wrap(registerJudger);

