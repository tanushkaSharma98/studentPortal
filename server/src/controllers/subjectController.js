const { getSubjects } = require('../services/subjectService');

exports.getSubjects = async (req, res) => {
    try {
        // Extract filters from query parameters
        const { branch_name, semester} = req.body;

        // Call service to get subjects with filters
        const subjects = await getSubjects({
            branch_name: branch_name || null,
            semester: semester ? parseInt(semester, 10) : null
        });

        if (subjects.length > 0) {
            return res.status(200).json(subjects);
        } else {
            return res.status(404).json({ message: 'No Subject Found' });
        }
    } catch (error) {
        console.error('Error fetching subjects:', error);
        return res.status(500).json({ message: 'Failed to retrieve subjects due to server error' });
    }
};
