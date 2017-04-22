const co = require('co');

/** function co 包装
 *
 * @param {Object} obj
 * @return {Object} 包装之后的对象
 */
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