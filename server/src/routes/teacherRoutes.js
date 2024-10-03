const express = require('express');
const router = express.Router();
const { getTeacherProfile, uploadAttendance, getUploadedAttendance } = require('../controllers/teacherController.js');

const teacherSubController = require('../controllers/teacherSubController');
// Route to get student data
router.get('/profile', getTeacherProfile);

const teacherSubStudentController = require('../controllers/teacherSubStudentController');

router.get('/subject-students', (req, res, next) => {
  console.log("Received GET request:", req.query); // Log query parameters
  next();
}, teacherSubStudentController.getStudentsBySubject);

// // Route to get students by subject code
// router.get('/subject-students', teacherSubStudentController.getStudentsBySubject);


// POST route to upload attendance
router.post('/attendance/upload', uploadAttendance);

// GET route to retrieve uploaded attendance (NEW)
router.get('/attendance/get', getUploadedAttendance);

// Define route to get subjects for a specific teacher
router.get('/subjects', teacherSubController.getSubjectsByTeacher);



module.exports = router;