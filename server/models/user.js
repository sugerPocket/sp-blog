const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const co = require('co');

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
  password: {
    type: String,
    require: true
  },
  role: {
    type: Boolean,
    required: true,
    default: false
  }
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

function * isRedefined(user) {
  const query = { '$or': [{ username: user.username }, { email: user.email }] };

  let result = yield userModel.findOne(query).exec();
  
  return !(result === null);
}

function * updateOneUser(uid, update) {
  const query = { '_id': uid };
  const select = '_id username nickname password';

  return userModel.update(query, { $set: update }).select(select).exec();
}

function * removeOneUser(username) {
  const query = { '_id': uid };

  return userModel.remove(query).exec();
}

module.exports = {
  createOne   : createOneUser,
  getOne      : retrieveOneUser,
  updateOne   : updateOneUser,
  removeOne   : removeOneUser,
  isRedefined : co.wrap(isRedefined),
};
