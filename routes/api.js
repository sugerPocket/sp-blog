const resultModel = require('../result_config/result');

let authorityJudge = (req, res, next) => {
  if (req.session.userMeta) {
    req.body.userMeta = req.session.userMeta;
  }
  else {
    let result = new resultModel();
    result.status = 'AUTHENTICATION_ERROR';
    result.msg = '未登录用户';
    res.end(result);
  }
};

module.exports = authorityJudge;