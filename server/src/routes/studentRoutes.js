const express = require('express');
const router = express.Router();
const { getStudentMarks, getStudentPerformance } = require('../controllers/studentMarksController');
const {getStudentProfile } = require('../controllers/studentController');

// Route to get student data
router.get('/profile', getStudentProfile);
// Route to get student marks by student ID and subject ID
router.get('/marks/:subjectId/:examId', getStudentMarks);
router.get('/marksPerformance', getStudentPerformance);

module.exports = router;
