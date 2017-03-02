const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  username: String,
  nickname: String,
  email: String,
  password: String,
  role: Boolean
});

let userModel = mongoose.model('user', userSchema);

module.exports = userModel;