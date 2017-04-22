var express = require('express');
var router = express.Router();

/* GET home page. */
router.get(/^((?!(includes|api|auth|files)).)*$/, function(req, res, next) {
  console.log({ root: __dirname.substr(0, __dirname.lastIndexOf('/')) + '/../views'});
  res.sendFile('/index.html', { root: __dirname.substr(0, __dirname.lastIndexOf('/')) + '/../views'});
});

router.get('/includes/:name', function (req, res) {
  let name = req.params.name;
  name += '.jade';
  res.render('includes/' + name);
});

router.get('/partials/:name', function (req, res) {
  let name = req.params.name;
  res.render('partials/' + name);
});

module.exports = router;
