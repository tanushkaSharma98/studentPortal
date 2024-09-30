const express = require('express');
const { getTeacherCount, getAllTeachers, getTeachersByBranchAndSemester, searchTeachersByName } = require('../controllers/teacherManagementController')
const router = express.Router();

router.get('/count', getTeacherCount);

router.get('/', getAllTeachers);

// API to get teachers by branch and semester
router.get('/branch-semester', getTeachersByBranchAndSemester);

// API to search teachers by name
router.get('/search', searchTeachersByName);

module.exports = router;