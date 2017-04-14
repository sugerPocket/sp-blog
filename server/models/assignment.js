const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

let assignmentSchema = new Schema({
  title: String,
  content: String,
  start: {
    type: Date,
    default: Date.now
  },
  ddl: {
    type: Date,
    default: Date.now
  },
  type: Number,
  week: Number,
  promulgatorId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  fileEntry: {
    allowable: Boolean,
    maxSize: Number,
    nameRegExp: String
  }
});

let assignmentModel = mongoose.model('assignment', assignmentSchema);

function getAllAssignments() {
  let query = {};
  let select = 
    '_id ' +
    'start ' + 
    'title ' +
    'ddl ' +
    'type ' +
    'week ' +
    'promulgatorId ' +
    'content ' +
    'fileEntry';

  return assignmentModel.find(query).populate('promulgatorId').select(select).sort({'_id': -1}).exec();
}

function createOneAssignment(newAssignment) {
  let query = {};

  return assignmentModel.create([newAssignment]);
}

function getOneAssignment(assignmentId) {
  let query = { _id: assignmentId };
  let select = 
    '_id ' +
    'start ' + 
    'title ' +
    'ddl ' +
    'type ' +
    'week ' +
    'promulgatorId ' +
    'content ' +
    'fileEntry';

  return assignmentModel.findOne(query).select(select).exec();
}

exports = module.exports = {
  getAll    : getAllAssignments,
  createOne : createOneAssignment,
  getOne    : getOneAssignment
};
