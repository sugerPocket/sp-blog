function required(middleware) {
  return (req, res, next) => middleware(req, res, next, true);
}

module.exports = required;