const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const co = require('co');

let userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  nickname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
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

function retrieveOneUser(username, uid) {
  const query = {};
  if (username) query.username = username;
  else if (uid) query._id = uid;
  
  const select = '_id username nickname password email role';

  return userModel.findOne(query).select(select).exec();
}

function * isRedefined(user) {
  const query = { '$or': [{ username: user.username }, { email: user.email }] };

  let result = yield userModel.findOne(query).exec();
  
  return !(result === null);
}

function updateOneUser(uid, update) {
  const select = '_id username nickname password email role';

  return userModel.findByIdAndUpdate(uid, { $set: update }).select(select).exec();
}

function removeOneUser(uid) {
  const select = '_id username nickname password email role';

  return userModel.findByIdAndRemove(uid).select(select).exec();
}

function getAllUser() {
  const query = {};
  const select = '_id username nickname role email';

  return userModel.find(query).select(select).exec();
}

module.exports = {
  createOne   : createOneUser,
  getOne      : retrieveOneUser,
  updateOne   : updateOneUser,
  removeOne   : removeOneUser,
  getAll      : getAllUser,
  isRedefined : co.wrap(isRedefined),
};
