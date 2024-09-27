const { getStudentCount } = require('../services/studentManagementService');
const { getStudentProfile } = require('../services/studentService');

const sendErrorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({ message });
};

exports.getStudentCount = async (req, res) => {
    try {
        const userType = req.user.user_type;
        if (userType !== 0 && userType !== 3) {
            return sendErrorResponse(res, 403, 'Access denied. Only admins see student data.');
        }

        const count = await getStudentCount();
        res.status(200).json({ studentCount: count });
    } catch (error) {
        console.error('Error fetching student count:', error);
        sendErrorResponse(res, 500, 'Error fetching student count');
    }
};

exports.getStudentProfile = async (req, res) => {
    const { userId } = req.params;
    console.log('User inside studentProfileController:', req.user);

    const userType = req.user.user_type;
    if (userType !== 0 && userType !== 3) {
        return sendErrorResponse(res, 403, 'Access denied. Only admins see student data.');
    }

    try {
        const studentData = await getStudentProfile(userId);

        if (!studentData) {
            return sendErrorResponse(res, 404, 'Student not found');
        }

        res.json(studentData);
    } catch (err) {
        console.error('Error fetching student profile:', err);
        sendErrorResponse(res, 500, 'Server error');
    }
};
