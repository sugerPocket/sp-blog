
/** 根据字符串选取 object 里面的属性
 * 
 * @param {Object} obj 
 * @param {String} fields 
 * @return {Object} result 新对象
 */
function selector(obj, fields) {
  fields = fields.split(' ');
  let result = {};

  fields.forEach(field => {
    if (typeof obj[field] != 'undefined')
      result[field] = obj[field];
    else console.error('fieldsSelect: field "' + field + '" not found.');
  });

  return result;
}

module.exports = selector;