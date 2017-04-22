const { sendData } = require('../../utils');

function user(req, res, next) {
  let data = req.body;

  if (!data || !data.username || !data.password || !data.email || !data.nickname) sendData(req, res, 'BAD_DATA', null, '请确保数据完整性');

  if (!/^[a-zA-Z0-9_]{6,18}$/.test(data.username)) valid = false;
  if (!/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,18}$/.test(data.password)) valid = false;
  if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(data.email)) valid = false;
  if (!/^[a-zA-Z\u4E00-\u9FA5][a-zA-Z0-9\u4E00-\u9FA5_]{1,15}$/.test(data.nickname)) valid = false;

  if (!data.identifyingCode || data.identifyingCode != 2468) sendData(req, res, 'BAD_DATA', null, '验证码错误，请联系管理员');

  if (valid) return next();
  else return sendData(req, res, 'BAD_DATA', null, '请确保格式正确性');
}

module.exports = user;