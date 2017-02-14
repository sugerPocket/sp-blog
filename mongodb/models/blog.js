const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let blogSchema = new Schema({
  id: Number,
  title: String,
  authorname: String,
  comments: [{
    body: String,
    date: Date,
    authorname: String,
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