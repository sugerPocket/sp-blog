
function resultModel() {
  this.status = 'OK';
  this.data = {};
  this.userData = {
    'role': 'ordinary user'
  };
  this.msg = '';
  return this;
};

module.exports = resultModel;