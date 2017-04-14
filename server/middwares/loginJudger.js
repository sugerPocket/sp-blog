const { sendData } = require('../utils');

function loginJudger(req, res, next) {
  if (req.session.userMeta) return next();
  else return sendData(req, res, 'AUTHENTICATION_ERROR', null, '您还未登录呢');
}

module.exports = loginJudger;

