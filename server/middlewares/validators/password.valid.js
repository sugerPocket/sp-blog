const { sendData } = require('../../utils');

function validator(req, res, next, required) {
  let { password } = req.body;
  if (required && !req.body.hasOwnProperty('password'))
    return sendData(req, res, 'BAD_DATA', null, '请输入密码');
  else if (!req.body.hasOwnProperty('password'))
    return next();
  else if (Object.prototype.toString.call(password) === '[object String]' && /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,18}$/.test(password))
    return next();
  else return sendData(req, res, 'BAD_DATA', null, '密码格式不正确');
}

module.exports = validator;