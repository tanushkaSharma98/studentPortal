const branchSemSubModel = require('../models/branchSemSubModel');

const fetchBranchSemSubDetails = async (subject_code) => {
    try {
        const result = await branchSemSubModel.getBranchSemSubDetails(subject_code);
        if (result.length === 0) {
            throw new Error('No data found for the selected subject');
        }
        return result[0];  // Return the first row with branch name, semester, and subject initials
    } catch (error) {
        throw new Error(error.message || 'Error fetching branch, semester, and subject details');
    }
};

module.exports = {
    fetchBranchSemSubDetails,
};
