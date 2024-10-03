const express = require('express');
const router = express.Router();
const branchSemSubController = require('../controllers/branchSemSubController');

// Route to get branch name, semester, and subject initials
router.get('/:subject_code', branchSemSubController.getBranchSemSubDetails);

module.exports = router;