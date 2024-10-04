const express = require('express');
const router = express.Router();
const { getTeacherProfile, uploadAttendance, getUploadedAttendance } = require('../controllers/teacherController.js');
const teacherSubController = require('../controllers/teacherSubController');
const teacherSubStudentController = require('../controllers/teacherSubStudentController');

router.get('/profile', getTeacherProfile);

router.get('/subject-students', teacherSubStudentController.getStudentsBySubject);

// POST route to upload attendance
router.post('/attendance/upload', uploadAttendance);

// GET route to retrieve uploaded attendance (NEW)
router.get('/attendance/get', getUploadedAttendance);

// Define route to get subjects for a specific teacher
router.get('/subjects', teacherSubController.getSubjectsByTeacher);

module.exports = router;