// module.exports = router;

const express = require('express');
const router = express.Router();
const { getExamDetails } = require('../controllers/exam_typeController');

// Endpoint to get exam names
router.get('', getExamDetails);

module.exports = router;