const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let blogSchema = new Schema({
  id: Number,
  title: String,
  authorId: String,
  content: String
});

module.exports = blogSchema;