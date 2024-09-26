const { getBranch, registerBranch, getBranchCount, changeBranchStatus } = require('../services/branchService');

exports.getBranch = async (req, res) => {
    try {
        // Extract filters from query parameters
        const { branch_name, semester} = req.body;

        const branch = await getBranch({
            branch_name: branch_name || null,
            semester: semester ? parseInt(semester, 10) : null
        });

        if (branch.length > 0) {
            return res.status(200).json(branch);
        } else {
            return res.status(404).json({ message: 'No Branch Found' });
        }
    } catch (error) {
        console.error('Error fetching branch:', error);
        return res.status(500).json({ message: 'Failed to retrieve branch due to server error' });
    }
};

exports.getBranchCount= async (req, res) => {
    try {
        const userType = req.user.user_type;
        if (userType !== 0 && userType !== 3) {
            return res.status(403).json({ message: 'Access denied. Only admins can see branch data.' });
    }
        const count = await getBranchCount();
        res.status(200).json({ branchCount: count });
        } catch (error) {
        res.status(500).json({ error: 'Error fetching branch count' });
    }
};

exports.createBranch = async (req, res) => {
    const { branchName } = req.body;

    try {
        // Check if the user is an admin (user_type 0 or 3)
        const userType = req.user.user_type;
        if (userType !== 0 && userType !== 3) {
            return res.status(403).json({ message: 'Access denied. Only admins can add branch.' });
        }

        // Call the service to create the subject
        const result = await registerBranch( branchName );

        // Return success response
        return res.status(201).json({
            message: 'Branch added successfully',
            data: result
        });
    } catch (error) {
        console.error('Error in controller:', error);
        return res.status(500).json({
            message: 'Failed to add branch'
        });
    }
};

exports.updateBranchIsActive = async (req, res) => {
    const { branch_id, is_active } = req.body;
  
    try {
      // Check if the user is a super admin (user_type 0)
      const userType = req.user.user_type;
      if (userType !== 0 && userType !== 3) {
        return res.status(403).json({ message: 'Access denied. Only admins can update branch status.' });
      }
  
      // Call the service to update the status
      const result = await changeBranchStatus(branch_id, is_active);
  
      // Return success response
      return res.status(200).json({
        message: 'Branch status updated successfully',
        data: result
      });
    } catch (error) {
      console.error('Error in controller:', error);
      return res.status(500).json({
        message: 'Failed to update branch status'
      });
    }
  };