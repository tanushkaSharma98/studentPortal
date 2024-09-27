// userLogController.js
const { fetchUserActivity } = require('../services/activityService');

// Controller to handle fetching all user logs
exports.getUserActivity = async (req, res) => {
    try {

        const userType = req.user.user_type;
        if (userType !== 0 && userType !== 3) {
            return res.status(403).json({ message: 'Access denied. Only admins can get admin data.' });
        }
        // Call service to fetch all logs
        const logs = await fetchUserActivity();

        // Send the logs in response
        return res.status(200).json({ success: true, data: logs });
    } catch (error) {
        console.error(`Get User Activity Controller Error: ${error.message}`);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
