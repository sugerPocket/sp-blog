const co = require('co');

function wrapObj(obj) {
  let result = {};
  for (let key in obj) {
    if (typeof obj[key] !== 'function') {
      result[key] = obj[key];
    }
    result[key] = co.wrap(obj[key]);
  }
  return result;
}

module.exports = wrapObj;