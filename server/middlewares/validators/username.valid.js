const { sendData } = require('../../utils');

function validator(req, res, next, required) {
  let { username } = req.body;
  if (required && !req.body.hasOwnProperty('username'))
    return sendData(req, res, 'BAD_DATA', null, '请输入用户名');
  else if (!req.body.hasOwnProperty('username'))
    return next();
  else if (Object.prototype.toString.call(username) === '[object String]' && /^[a-zA-Z0-9_]{6,18}$/.test(username))
    return next();
  else return sendData(req, res, 'BAD_DATA', null, '用户名格式不正确');
}

module.exports = validator;