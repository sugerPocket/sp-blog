var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.url, res, next);
  res.sendfile('/index.html', { root: __dirname.substr(0, __dirname.lastIndexOf('/')) + '/views'});
});

router.get('/includes', function (req, res) {
  let name = req.params.name;
  res.render('includes/' + name);
});

router.get('/partials', function (req, res) {
  let name = req.params.name;
  res.render('partials/' + name);
});

module.exports = router;
