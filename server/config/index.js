const express = require('express');
const app = express();
const index = require('../routes/index');
const assignment = require('../routes/assignment');
const auth = require('../routes/auth');
const user = require('../routes/user');
const admin = require('../routes/admin');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const loginJudger = require('../middlewares/loginJudger');

// view engine setup
app.set('views', path.join(__dirname, '../../views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(session({
  resave: true, // don't save session if unmodified  
  saveUninitialized: false, // don't create session until something stored
  cookie: { maxAge: 3000000 },
  secret: 'sugerpocket'
}));

app.use('/', index);
app.use('/auth', auth);
app.use('/api', loginJudger);
app.use('/api/assignment', assignment);
app.use('/api/user', user);
app.use('/api/admin', admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;