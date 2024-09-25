const express = require('express');
const router = express.Router();
const { getBranch, createBranch,updateBranchIsActive } = require('../controllers/branchController');

router.get('/', getBranch);
// router.post('/create', createBranch);
// router.put('/update', updateBranchIsActive);

module.exports = router;
