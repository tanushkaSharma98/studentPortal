// adminController.js
const adminService = require('../services/adminService');

// Controller to handle fetching all admins
const getAdmins = async (req, res) => {
  const requesting_user_id = req.user.user_id;  // Extract user_id from req.user

  try {
    // Fetch admin data from the service
    const admins = await adminService.getAdmins(requesting_user_id);
    
    // Return the data as a JSON response
    res.status(200).json(admins);
  } catch (error) {
    console.error('Error fetching admin data:', error.message);
    res.status(500).json({ error: error.message });  // Changed to 500 for internal server errors
  }
};

// Create new admin account
const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
      // Call the service to create the user and admin
      const result = await adminService.registerAdmin(name, email, password);

      // Return success response
      return res.status(201).json({
          message: 'Admin created successfully',
          data: result
      });
  } catch (error) {
      console.error('Error in controller:', error);
      return res.status(500).json({
          message: 'Failed to create admin'
      });
  }
};

// change admin active status
const updateAdminIsActive = async (req, res) => {
  const { user_id, is_active } = req.body;

  try {
      // Call the service to update the status
      const result = await adminService.changeAdminStatus(user_id, is_active);

      // Return success response
      return res.status(200).json({
          message: 'Admin status updated successfully',
          data: result
      });
  } catch (error) {
      console.error('Error in controller:', error);
      return res.status(500).json({
          message: 'Failed to update admin status'
      });
  }
};

module.exports = { getAdmins, createAdmin, updateAdminIsActive };
