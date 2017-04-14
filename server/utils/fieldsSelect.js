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