const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  promulgatorId: String,
  fileEntry: {
    allowable: Boolean,
    maxSize: Number,
    nameRegExp: String
  }
});

let assignmentModel = mongoose.model('assignment', assignmentSchema);

module.exports = assignmentModel;