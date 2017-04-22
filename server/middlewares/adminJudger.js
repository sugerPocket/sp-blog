const { sendData } = require('../utils');

function adminJudger(req, res, next) {
  if (req.session.userMeta.role) return next();
  else return sendData(req, res, 'AUTHENTICATION_ERROR', null, '您没有获得管理权限');
}

module.exports = adminJudger;
