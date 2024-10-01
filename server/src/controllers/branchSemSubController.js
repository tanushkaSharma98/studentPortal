const branchSemSubService = require('../services/branchSemSubService');

const getBranchSemSubDetails = async (req, res) => {
    const { subject_code } = req.params;

    if (!subject_code) {
        return res.status(400).json({ message: 'Subject code is required' });
    }

    try {
        const details = await branchSemSubService.fetchBranchSemSubDetails(subject_code);
        res.status(200).json({
            branch_name: details.branch_name,
            semester: details.semester,
        });
    } catch (error) {
        console.error('Error fetching details:', error.message);
        res.status(500).json({ message: 'Error fetching branch, semester, and subject name' });
    }
};

module.exports = {
    getBranchSemSubDetails,
};
