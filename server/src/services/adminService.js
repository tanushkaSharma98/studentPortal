const adminModel = require('../models/adminModel');
const { createUserAndAdmin } = require('../models/createAdminModel');

const getAdmins = async (requesting_user_id) => {
  // Fetch admin data from the model
  const admins = await adminModel.getAdmins(requesting_user_id);
  if (!admins || admins.length === 0) {
    throw new Error('No admins found');
  }
  
  return admins;
};

const registerAdmin = async (name, email, password) => {
    try {
        // Call the model function to create a user and admin
        const result = await createUserAndAdmin(name, email, password);

        return result;
    } catch (error) {
        console.error('Service Error: Failed to register admin', error);
        throw new Error('Service Error: Failed to register admin');
    }
};

module.exports = { getAdmins, registerAdmin };
