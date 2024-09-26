const express = require('express');
const { getStudentMarks, getStudentPerformance } = require('../controllers/adminStudentMarksController');
const { getStudentCount } = require('../controllers/studentManagementController')
const router = express.Router();

// Define the route to get student marks
router.get('/count', getStudentCount);
router.get('/Marks/:userId/:subjectId/:examId' , getStudentMarks);
router.get('/marksPerformance/:userId', getStudentPerformance);

module.exports = router;