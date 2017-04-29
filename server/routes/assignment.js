const express = require('express');
const router = express.Router();
const assignmentValidator = require('../middlewares/validators/assignment.valid');
const ctrl = require('../controllers/assignment.ctrl');
const { adminJudger } = require('../middlewares');

router.get('/one/:assignmentId', ctrl.retrieveOneAssignment);
router.get('/list', ctrl.retrieveAllAssignments);
router.post('/one/:assignmentId/file', ctrl.submitOneFile);
router.post('/new', adminJudger, ctrl.createOneAssignment);
router.delete('/one/:assignmentId/delete', adminJudger, ctrl.deleteOneAssignment);
router.put('/one/:assignmentId/update', adminJudger, ctrl.editOneAssignment);

module.exports = router;