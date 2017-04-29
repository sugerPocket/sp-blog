const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/admin.ctrl');
const { username, password } = require('../middlewares/validators');
const { adminJudger } = require('../middlewares');

router.put('/update', adminJudger, username, password, ctrl.updateOneUser);
router.delete('/delete/:uid', adminJudger, ctrl.deleteOneUser);
router.get('/users', adminJudger, ctrl.getAllUsers);

module.exports = router;