/** 为对象属性重命名
 * 
 * @param {Object} obj 
 * @param {Object} options
 * @return {Object} result 重命名的新对象 
 */
function renamer(obj, options) {
  let result = {};
  result = Object.assign({}, obj);

  for (field in options) {
    if (result[field]) {
      let val = result[field];
      delete result[field];
      result[options[field]] = val;
    }
    else console.error('fieldsRename: field "' + field + '" not found.');
  }

  return result;
}

module.exports = renamer;