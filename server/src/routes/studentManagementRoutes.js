const express = require('express');
const { getStudentMarks, getStudentPerformance } = require('../controllers/adminStudentMarksController');
const { getStudentCount, getStudentProfile } = require('../controllers/studentManagementController')
const router = express.Router();

router.get('/count', getStudentCount);

router.get('/profile/:userId', getStudentProfile);

router.get('/Marks/:userId/:subjectId/:examId' , getStudentMarks);
router.get('/marksPerformance/:userId', getStudentPerformance);

module.exports = router;