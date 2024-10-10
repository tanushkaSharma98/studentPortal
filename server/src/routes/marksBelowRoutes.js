// routes/marksRoutes.js
const express = require('express');
const marksController = require('../controllers/marksBelowController');

const router = express.Router();

// Route to fetch students below marks threshold
router.get('/below-threshold', marksController.getStudentsBelowThreshold);

module.exports = router;