module.exports = getUserMeta;


function getUserMeta(req) {
  const userMeta = {
    uid,
    username,
    nickname
  } = req.session.userMeta;

  return userMeta;
}