const express = require('express');
const {getAdmins, createAdmin} = require('../controllers/adminController');
const router = express.Router();

// Define the route to get all admins
router.get('/admins', getAdmins);
router.post('/create', createAdmin);
router.put('/create', deleteAdmin);

module.exports = router;
