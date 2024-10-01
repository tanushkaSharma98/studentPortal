const express = require('express');
const router = express.Router();
const teacherPostAttendanceController = require('../controllers/teacherPostAttendanceController');

// POST route to upload attendance
router.post('/attendance/upload', teacherPostAttendanceController.uploadAttendance);

// GET route to retrieve uploaded attendance (NEW)
router.get('/attendance/get', teacherPostAttendanceController.getUploadedAttendance);


module.exports = router;