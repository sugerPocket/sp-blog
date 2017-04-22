const ctrl = require('../controllers/auth.ctrl');
const router = require('express').Router();
const { registerJudger, loginJudger } = require('../middlewares');

router.post('/init', loginJudger, ctrl.authInit);
router.post('/register', registerJudger, ctrl.registerOneUser);
router.post('/login', ctrl.logInOneUser);

module.exports = router;