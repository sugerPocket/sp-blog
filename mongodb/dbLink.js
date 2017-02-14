const mongoose = require('mongoose');
const userModel = require('./models/user');
const blogModel = require('./models/blog');

mongoose.connect('mongodb://127.0.0.1/sp-blog');

let db = {};
db.instance = mongoose;
db.user = userModel;
db.blog = blogModel;

module.exports = db;