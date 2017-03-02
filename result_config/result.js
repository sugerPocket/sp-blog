
function resultModel() {
  this.status = 'OK';
  this.data = {};
  this.userMeta = {
    'role': true
  };
  this.msg = '';
  return this;
};

module.exports = resultModel;