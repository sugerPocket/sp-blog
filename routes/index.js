
/*
 * GET home page.
 */

exports.index = function (req, res) {
  res.sendfile('/index.html', { root: __dirname.substr(0, __dirname.lastIndexOf('/')) + '/views' });
};

exports.partials = function (req, res) {
  let name = req.params.name;
  res.render('partials/' + name);
};

exports.includes = function (req, res) {
  let name = req.params.name;
  res.render('includes/' + name);
}