const express = require('express');
const {getAdmins, createAdmin, updateAdminIsActive} = require('../controllers/adminController');
const {getUserActivity} = require('../controllers/activityController');
const {updateUserpassword} = require('../controllers/updatePasswordController');
const router = express.Router();

// Define the route to get manage admins
router.get('/admins', getAdmins);
router.post('/create', createAdmin);
router.put('/update', updateAdminIsActive);

// Define the route to reset user password
router.put('/reset-password', updateUserpassword)

// Define the route to get user activity
router.get('/user', getUserActivity);

module.exports = router;
