const getUserMeta = require('./getUserMeta');

function sendData(req, res, status, data, msg) {
  const time     = new Date();
  const userMeta = getUserMeta(req);

  return res.json({
    status,
    data,
    msg,
    userMeta
  });
}