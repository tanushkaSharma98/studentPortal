// const express = require('express');
// const router = express.Router();
// const { getTeacherProfile, uploadAttendance, getUploadedAttendance } = require('../controllers/teacherController.js');
// const teacherSubController = require('../controllers/teacherSubController');
// const teacherSubStudentController = require('../controllers/teacherSubStudentController');
// const teacherPostMarksController = require('../controllers/teacherPostMarksController');
// const marksController = require('../controllers/marksBelowController');

// const teacherUpdateMarksController = require('../controllers/teacherUpdateMarksController');


// router.get('/profile', getTeacherProfile);

// router.get('/subject-students', teacherSubStudentController.getStudentsBySubject);

// // POST route to upload attendance
// router.post('/attendance/upload', uploadAttendance);

// // GET route to retrieve uploaded attendance (NEW)
// router.get('/attendance/get', getUploadedAttendance);

// // Define route to get subjects for a specific teacher
// router.get('/subjects', teacherSubController.getSubjectsByTeacher);

// // router.post('/marks/upload', marksController.uploadMarks);

// // Route to get marks by subject
// router.get('/get', teacherPostMarksController.getMarks);

// // router.post('/marks/upload', teacherPostMarksController.postMarks);


// router.put('/update', teacherUpdateMarksController.updateMarks);

// // // Route to fetch students below marks threshold
// router.get('/below-threshold', marksController.getStudentsBelowThreshold);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { 
    getTeacherProfile, 
    uploadAttendance, 
    getUploadedAttendance 
} = require('../controllers/teacherController.js');
const teacherSubController = require('../controllers/teacherSubController');
const teacherSubStudentController = require('../controllers/teacherSubStudentController');
const teacherPostMarksController = require('../controllers/teacherPostMarksController');
const marksController = require('../controllers/marksBelowController');
const teacherUpdateMarksController = require('../controllers/teacherUpdateMarksController');
const teachUpdateAttendanceController = require('../controllers/teachUpdateAttendanceController');
const  {getAttendanceByDateRange}  = require('../controllers/fromToRangeController');


// Define the route for fetching attendance by date range
router.get('/attendance/range', getAttendanceByDateRange);

// PUT route to update attendance
router.put('/update/Att', teachUpdateAttendanceController.updateAttendance);

// Teacher profile route
router.get('/profile', getTeacherProfile);

// Route to get students by subject
router.get('/subject-students', teacherSubStudentController.getStudentsBySubject);

// POST route to upload attendance
router.post('/attendance/upload', uploadAttendance);

// GET route to retrieve uploaded attendance
router.get('/attendance/get', getUploadedAttendance);

// Route to get subjects for a specific teacher
router.get('/subjects', teacherSubController.getSubjectsByTeacher);

// Route to upload marks
router.post('/marks/upload', teacherPostMarksController.uploadMarks);

// Route to get marks by subject
router.get('/marks', teacherPostMarksController.getMarks);

// Route to update marks
router.put('/marks/update', teacherUpdateMarksController.updateMarks);

// Route to fetch students below marks threshold
router.get('/marks/below-threshold', marksController.getStudentsBelowThreshold);

module.exports = router;
