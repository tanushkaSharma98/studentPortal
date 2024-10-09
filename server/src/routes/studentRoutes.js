const express = require('express');
const router = express.Router();
const { getStudentMarks, getStudentPerformance } = require('../controllers/studentMarksController');
const {getStudentProfile } = require('../controllers/studentController');
const { getStudentAttendance, getStudentAttendanceTrend, getStudentDailyAttendance} = require('../controllers/studentAttendanceController');

// Route to get student data
router.get('/profile', getStudentProfile);
// Route to get student marks by student ID and subject ID
router.get('/marks/:examId', getStudentMarks);
router.get('/marksPerformance', getStudentPerformance);
// Route to get student attendance
router.get('/attendance', getStudentAttendance);
// Define the route for fetching attendance trend
router.get('/attendance-trend', getStudentAttendanceTrend);
// Route for fetching daily attendance records
router.get('/attendance-daily-record', getStudentDailyAttendance);

module.exports = router;
