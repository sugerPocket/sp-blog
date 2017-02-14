const db = require('../../mongodb/dbLink');
const resultModel = require('../../result_config/result');

let blogAPI = {};

blogAPI.get = (req) => {
  let result = {

  };
  return new Promise((resolve, reject) => {
    console.log(req.params.command);
    resolve(JSON.stringify({status: 'OK', config: 'test'}));
  });
};

blogAPI.post = () => {

};

module.exports = blogAPI;