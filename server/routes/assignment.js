const express = require('express');
const router = express.Router();
const assignmentValidator = require('../middlewares/validators/assignment.valid');
const ctrl = require('../controllers/assignment.ctrl');

router.get('/one/:assignmentId', ctrl.retrieveOneAssignment);

router.get('/list', ctrl.retrieveAllAssignments);

router.post('/one/:assignmentId/file', ctrl.submitOneFile);

router.post('/new', ctrl.createOneAssignment);

module.exports = router;