const getUserMeta = require('./getUserMeta');

/** 统一发送消息的接口
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {String} status 自定义信息类型(OK)
 * @param {Object} data 响应数据
 * @param {String} msg 自定义传输信息
 */
function sendData(req, res, status, data, msg) {
  const time     = new Date();
  const userMeta = getUserMeta(req);

  return res.json({
    status,
    data,
    msg,
    userMeta,
  });
}

module.exports = sendData;