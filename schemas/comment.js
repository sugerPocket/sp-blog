const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let commentSchema = new Schema({
  blogId: Number,
  authorId: String,
  content: String
});

module.exports = commentSchema;