const { sendData } = require('../../utils');
const code = '2468';

function validator(req, res, next, required) {
  let { identifyingCode } = req.body;
  if (required && !req.body.hasOwnProperty('identifyingCode'))
    return sendData(req, res, 'BAD_DATA', null, '请输入验证码');
  else if (!req.body.hasOwnProperty('identifyingCode'))
    return next();
  else if (Object.prototype.toString.call(identifyingCode) === '[object String]' && identifyingCode === code)
    return next();
  else return sendData(req, res, 'BAD_DATA', null, '验证码不正确');
}

module.exports = validator;