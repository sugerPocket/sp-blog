const { sendData } = require('../../utils');

function validator(req, res, next, required) {
  let { email } = req.body;
  if (required && !req.body.hasOwnProperty('email'))
    return sendData(req, res, 'BAD_DATA', null, '请输入邮箱');
  else if (!req.body.hasOwnProperty('email'))
    return next();
  else if (Object.prototype.toString.call(email) === '[object String]' && /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email))
    return next();
  else return sendData(req, res, 'BAD_DATA', null, '邮箱格式不正确');
}

module.exports = validator;