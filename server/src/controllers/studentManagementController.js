const { getStudentCount } = require('../services/studentManagementService')

exports.getStudentCount= async (req, res) => {
    try {

        const userType = req.user.user_type;
        if (userType !== 0 && userType !== 3) {
            return res.status(403).json({ message: 'Access denied. Only admins see student data.' });
    }
        const count = await getStudentCount();
        res.status(200).json({ studentCount: count });
        } catch (error) {
        res.status(500).json({ error: 'Error fetching student count' });
    }
};
