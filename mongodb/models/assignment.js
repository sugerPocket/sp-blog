const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let assignmentSchema = new Schema({
  id: Number,
  title: String,
  content: String,
  ddl: String,
  type: Number,
  week: Number,
  promulgatorMeta: {
    id: Number
  },
  fileEntry: {
    allowable: Boolean,
    maxSize: Number,
    nameRegExp: RegExp,
  }
});

let assignmentModel = mongoose.model('assignment', assignmentSchema);

module.exports = assignmentModel;