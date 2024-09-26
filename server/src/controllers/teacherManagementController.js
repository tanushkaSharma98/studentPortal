const { getTeacherCount } = require('../services/teacherManagementService')

exports.getTeacherCount= async (req, res) => {
    try {

        const userType = req.user.user_type;
        if (userType !== 0 && userType !== 3) {
            return res.status(403).json({ message: 'Access denied. Only admins can see teacher data.' });
    }
        const count = await getTeacherCount();
        res.status(200).json({ teacherCount: count });
        } catch (error) {
        res.status(500).json({ error: 'Error fetching student count' });
    }
};
