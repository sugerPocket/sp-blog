

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