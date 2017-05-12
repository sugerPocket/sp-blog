const express = require('express');
const router = express.Router();
const { nickname, password } = require('../middlewares/validators');
const ctrl = require('../controllers/user.ctrl');

router.put('/update', nickname, password, ctrl.updateProfile);
router.post('/avatar', ctrl.uploadAvatar);
router.get('/avatar', ctrl.getAvatar);

module.exports = router;