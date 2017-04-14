const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let blogSchema = new Schema({
  title: String,
  promulgatorId: String,
  comments: [{
    body: String,
    date: Date,
    promulgatorId: String,
    hidden: Boolean
  }],
  date: {
    type: Date,
    default: Date.now()
  },
  content: String,
  hidden: Boolean
});

let blogModel = mongoose.model('blog', blogSchema);

module.exports = blogModel;