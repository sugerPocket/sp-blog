const express = require('express');
const router = express.Router();
const { nickname, password } = require('../middlewares/validators');
const ctrl = require('../controllers/user.ctrl');

router.put('/update', nickname, password, ctrl.updateProfile);

module.exports = router;