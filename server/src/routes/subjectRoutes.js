const express = require('express');
const router = express.Router();
const { getSubjects, createSubject, updateSubjectIsActive } = require('../controllers/subjectController');

router.get('/', getSubjects);
router.post('/create', createSubject);
router.put('/update', updateSubjectIsActive);

module.exports = router;
