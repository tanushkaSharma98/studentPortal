const express = require('express');
const router = express.Router();
const { getSubjects, createSubject, getSubjectCount, updateSubjectIsActive } = require('../controllers/subjectController');

router.get('/', getSubjects);
router.get('/count', getSubjectCount);
router.post('/create', createSubject);
router.put('/update', updateSubjectIsActive);

module.exports = router;
