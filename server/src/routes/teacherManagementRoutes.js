const express = require('express');
const { getTeacherCount } = require('../controllers/teacherManagementController')
const router = express.Router();

router.get('/count', getTeacherCount);

module.exports = router;