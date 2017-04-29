const { sendData } = require('../../utils');

function validator(req, res, next, required) {
  let { nickname } = req.body;
  if (required && !req.body.hasOwnProperty('nickname'))
    return sendData(req, res, 'BAD_DATA', null, '请输入昵称');
  else if (!req.body.hasOwnProperty('nickname'))
    return next();
  else if (Object.prototype.toString.call(nickname) === '[object String]' && /^[a-zA-Z\u4E00-\u9FA5][a-zA-Z0-9\u4E00-\u9FA5_]{1,15}$/.test(nickname))
    return next();
  else return sendData(req, res, 'BAD_DATA', null, '昵称格式不正确');
}

module.exports = validator;