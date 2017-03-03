const resultModel = require('../result_config/result');

let authorityJudge = (req, res, next) => {
  if (req.session.userMeta) {
    req.body.userMeta = req.session.userMeta;
    next();
  }
  else {
    let result = new resultModel();
    result.status = 'AUTHENTICATION_ERROR';
    result.msg = '未登录用户';
    res.end(JSON.stringify(result));
  }
};

module.exports = authorityJudge;