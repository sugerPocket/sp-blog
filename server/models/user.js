const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  nickname: String,
  email: {
    type: String 
  },
  password: String,
  role: Boolean
});

let userModel = mongoose.model('user', userSchema);

function createOneUser(user) {
  const query = {};

  return userModel.create([user]);
}

function retrieveOneUser(username) {
  const query = { 'username': username };
  const select = '_id username nickname password';

  return userModel.findOne(query).select(select).exec();
}

function isRedifined(user) {
  const query = { '$or': [{ username: user.username }, { email: user.email }] };

  return userModel.findOne(query).exists().exec();
}

module.exports = {
  createOneUser,
  retrieveOneUser,
  isRedifined
};
