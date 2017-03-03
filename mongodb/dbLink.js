const mongoose = require('mongoose');
const userModel = require('./models/user');
const blogModel = require('./models/blog');
const assignmentModel = require('./models/assignment');

mongoose.connect('mongodb://127.0.0.1/sugerpocket');

let db = {};
db.instance = mongoose;
db.user = userModel;
db.blog = blogModel;
db.assignment = assignmentModel;

module.exports = db;