const express = require('express');
const router = express.Router();
const { getBranch, createBranch, getBranchCount, updateBranchIsActive } = require('../controllers/branchController');

router.get('/', getBranch);
router.get('/count', getBranchCount)
router.post('/create', createBranch);
router.put('/update', updateBranchIsActive);

module.exports = router;
