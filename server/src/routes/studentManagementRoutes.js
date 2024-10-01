const express = require('express');
const { getStudentMarks, getStudentPerformance } = require('../controllers/adminStudentMarksController');
const { getStudentCount, getStudentProfile, updateStudentIsActive } = require('../controllers/studentManagementController')
const { getAllStudents, getStudentsByBranchAndSemester, searchStudentsByName } = require('../controllers/adminStudentListController');

const router = express.Router();

router.get('/count', getStudentCount);

router.get('/', getAllStudents);
router.get('/branch-semester', getStudentsByBranchAndSemester);
router.get('/search', searchStudentsByName);
router.put('/update', updateStudentIsActive);

router.get('/profile/:userId', getStudentProfile);

router.get('/Marks/:userId/:subjectId/:examId' , getStudentMarks);
router.get('/marksPerformance/:userId', getStudentPerformance);

module.exports = router;