const express = require('express');
const router = express.Router();
const { getExam, createExam, updateExamIsActive } = require('../controllers/examController');

router.get('/', getExam);
router.post('/create', createExam);
router.put('/update', updateExamIsActive);

module.exports = router;
