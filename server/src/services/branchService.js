const { getBranch } = require('../models/branchModel'); // Import the Subject model directly
const { createBranch } = require('../models/createBranchModel');
const { updateBranchStatus } = require('../models/changeBranchIsActiveModel');

exports.getBranch = async (filters) => {
    try {
      // Fetch branch detail from the database
      const branch = await getBranch(filters);
        return branch;
    } catch (error) {
        console.error('Error in fetchBranch service:', error);
        throw new Error('Unable to retrieve branch details from database');
    }
  };

  exports.registerBranch = async ( branchName ) => {
    try {
        // Call the model function to create a user and admin
        const result = await createBranch( branchName );

        return result;
    } catch (error) {
        console.error('Service Error: Failed to add branch', error);
        throw new Error('Service Error: Failed to register branch');
    }
};

exports.changeBranchStatus = async (branch_id, is_active) => {
    try {
  
        const result = await updateBranchStatus(branch_id, is_active);
  
        return result;
    } catch (error) {
        console.error('Service Error: Failed to update branch status', error);
        throw new Error('Service Error: Failed to update branch status');
    }
  };