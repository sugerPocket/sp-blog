const username = require('./username.valid');
const password = require('./password.valid');
const email = require('./email.valid');
const nickname = require('./nickname.valid');
const identifyingCode = require('./identifyingCode.valid');
const assignment = require('./assignment.valid');
const required = require('./required');


module.exports = {
  username,
  nickname,
  identifyingCode,
  email,
  password,
  required,
  assignment,
};