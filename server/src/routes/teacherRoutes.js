const express = require('express');
const router = express.Router();
const { getTeacherProfile, uploadAttendance, getUploadedAttendance } = require('../controllers/teacherController.js');

// Route to get student data
router.get('/profile', getTeacherProfile);

// POST route to upload attendance
router.post('/attendance/upload', uploadAttendance);

// GET route to retrieve uploaded attendance (NEW)
router.get('/attendance/get', getUploadedAttendance);

module.exports = router;