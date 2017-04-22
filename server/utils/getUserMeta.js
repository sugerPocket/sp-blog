module.exports = getUserMeta;

/** 从 req session 获取 用户信息
 * 
 * @param {Request} req 
 * @return {Object} userMeta 可视用户信息
 */
function getUserMeta(req) {
  let userMeta = {};
  if (!req.session.userMeta) return userMeta;
  userMeta = {
    uid,
    username,
    nickname,
    role,
  } = req.session.userMeta;

  return userMeta;
}