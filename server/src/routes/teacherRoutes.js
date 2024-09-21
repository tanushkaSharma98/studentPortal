const express = require('express');
const router = express.Router();
const { getTeacherProfile } = require('../controllers/teacherController.js');

// Route to get student data
router.get('/profile', getTeacherProfile);

module.exports = router;