const express = require('express');
const { getTeacherCount } = require('../controllers/teacherManagementController')
const { getAllTeachers, getTeachersByBranchAndSemester, searchTeachersByName } = require('../controllers/adminTeacherlistController');
const createTeacherController = require('../controllers/createTeacherController');
const router = express.Router();

router.get('/count', getTeacherCount);

router.get('/', getAllTeachers);

// API to get teachers by branch and semester
router.get('/branch-semester', getTeachersByBranchAndSemester);

// API to search teachers by name
router.get('/search', searchTeachersByName);

router.post('/create', (req, res, next) => {
    console.log("POST /create route hit");
    next();
  }, createTeacherController.createTeacher);

module.exports = router;