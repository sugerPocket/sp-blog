const express = require('express');
const app = express();
const index = require('../routes');
const assignment = require('../routes/assignment');
const auth = require('../routes/auth');
const user = require('../routes/user');

app.use('/', index);
app.use('/auth', auth);
app.use('/api/assignment', assignment);
app.use('/api/user', user);

module.exports = app;