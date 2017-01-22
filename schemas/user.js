const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  username: String,
  nickname: String,
  email: String,
  password: String
});

module.exports = userSchema;