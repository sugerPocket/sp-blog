
/** 统一错误处理函数
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {String} status 可视错误类型
 * @param {Error} err 产生的错误对象
 * @param {String} msg 自定义用户信息
 */
function handleError(req, res, status, err, msg) {
  let time = new Date();
  if (err) console.error(err.stack);
  else
    throw new Error('handleError 传入的 err 为 null');
  let data = null;
  let stack = err.stack;

  res.json({
    status,
    data,
    time,
    msg,
    stack
  });
}

module.exports = handleError;