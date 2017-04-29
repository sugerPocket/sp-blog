const ctrl = require('../controllers/auth.ctrl');
const router = require('express').Router();
const { registerJudger, loginJudger } = require('../middlewares');
const { username, password, email, identifyingCode, nickname, required } = require('../middlewares/validators');

router.post('/init', loginJudger, ctrl.authInit);
router.post('/register', required(username), required(password), required(nickname), required(email), required(identifyingCode), registerJudger, ctrl.registerOneUser);
router.post('/login', required(username), required(password), ctrl.logInOneUser);

module.exports = router;