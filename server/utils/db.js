const mongoose = require('mongoose');
const models = require('../models');

mongoose.connect('mongodb://127.0.0.1/sugerpocket_test');

module.exports = mongoose;