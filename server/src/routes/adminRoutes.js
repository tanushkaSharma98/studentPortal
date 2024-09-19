const express = require('express');
const {getAdmins, createAdmin, updateAdminIsActive} = require('../controllers/adminController');
const router = express.Router();

// Define the route to get manage admins
router.get('/admins', getAdmins);
router.post('/create', createAdmin);
router.put('/update', updateAdminIsActive);

module.exports = router;
