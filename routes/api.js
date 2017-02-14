let express = require('express');
let router = express.Router();
let blogAPI = require('./api/blog');
let userAPI = require('./api/user');

/* GET home page. */
router.get('/blog/:command', (req, res, next) => {
  blogAPI
    .get(req)
    .then((result) => {
      res.end(JSON.stringify(result));
    })
    .catch((err) => res.end(JSON.stringify(err)));
});

router.post('/blog/:path', (req, res, next) => {
  blogAPI
    .post(req)
    .then((result) => {
      res.end(JSON.stringify(result));
    })
    .catch((err) => res.end(JSON.stringify(err)));
});

router.post('/users/:command', (req, res, next) => {
  userAPI
    .post(req)
    .then((result) => {
      if (result.setSession) {
        req.session.username = result.userData.username;
      }
      res.end(JSON.stringify(result));
    })
    .catch((err) => res.end(JSON.stringify(err)));
});


module.exports = router;