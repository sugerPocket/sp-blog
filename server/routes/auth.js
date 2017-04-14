const ctrl = require('../controllers/auth.ctrl');
const router = require('express').Router();

router.post('/init', ctrl.init);
router.post('/register', ctrl.registerOneUser);
router.post('/login', ctrl.logInOneUser);

module.exports = router;