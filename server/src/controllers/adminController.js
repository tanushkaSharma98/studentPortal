const adminService = require('../services/adminService');

// Controller to handle fetching all admins
const getAdmins = async (req, res) => {
  const requesting_user_id = req.user.user_id;  // Extract user_id from req.user

  try {

    const userType = req.user.user_type;
    if (userType !== 0 && userType !== 3) {
      return res.status(403).json({ message: 'Access denied. Only admins can get admin data.' });
    }

    // Fetch admin data from the service
    const admins = await adminService.getAdmins(requesting_user_id);
    
    // Return the data as a JSON response
    res.status(200).json(admins);
  } catch (error) {
    console.error('Error fetching admin data:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Create new admin account (Only user_type 0 can add new admins)
const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user is a super admin (user_type 0)
    const userType = req.user.user_type;
    if (userType !== 0) {
      return res.status(403).json({ message: 'Access denied. Only super admins can create admins.' });
    }

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

// Change admin active status (Only user_type 0 can update admin status)
const updateAdminIsActive = async (req, res) => {
  const { user_id, is_active } = req.body;

  try {
    // Check if the user is a super admin (user_type 0)
    const userType = req.user.user_type;
    if (userType !== 0) {
      return res.status(403).json({ message: 'Access denied. Only super admins can update admin status.' });
    }

    // Log the request to make sure it reaches the controller
    console.log('Admin update request:', req.body);

    // Call the service to update the status
    const result = await adminService.changeAdminStatus(user_id, is_active);

    // Return success response
    return res.status(200).json({
      message: 'Admin status updated successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error in controller:', error);
    return res.status(500).json({
      message: 'Failed to update admin status',
    });
  }
};

module.exports = { getAdmins, createAdmin, updateAdminIsActive };
