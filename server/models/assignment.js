const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

let assignmentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
    default: Date.now
  },
  ddl: {
    type: Date,
    required: true,    
    default: Date.now
  },
  type: {
    type: Number,
    required: true,
  },
  week: {
    type: Number,
    required: true,
  },
  promulgatorId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  fileEntry: {
    allowable: Boolean,
    maxSize: Number,
    nameRegExp: String
  }
});

const select = 
  '_id ' +
  'start ' + 
  'title ' +
  'ddl ' +
  'type ' +
  'week ' +
  'promulgatorId ' +
  'content ' +
  'fileEntry';
  
const populate = {
  path: 'promulgatorId',
  model: 'user',
  select: '' +
    'username ' +
    'userMeta ' +
    'nickname ' +
    'role'
};

let assignmentModel = mongoose.model('assignment', assignmentSchema);

function getAllAssignments() {
  let query = {};

  return assignmentModel.find(query).populate(populate).select(select).sort({'_id': -1}).exec();
}

function createOneAssignment(newAssignment) {
  let query = {};

  return assignmentModel.create([newAssignment]);
}

function getOneAssignment(assignmentId) {
  let query = { _id: assignmentId };

  return assignmentModel.findOne(query).populate(populate).select(select).exec();
}

function updateOneAssignment(assignmentId, newAssignment) {
  let update = { $set: newAssignment };

  return assignmentModel.findByIdAndUpdate(assignmentId, update).populate(populate).select(select).exec();
}

function removeOneAssignment(assignmentId) {

  return assignmentModel.findByIdAndRemove(assignmentId).populate(populate).select(select).exec();
}

exports = module.exports = {
  getAll    : getAllAssignments,
  createOne : createOneAssignment,
  getOne    : getOneAssignment,
  updateOne : updateOneAssignment,
  removeOne : removeOneAssignment,
};
