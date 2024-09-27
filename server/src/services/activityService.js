const { getUserActivity } = require('../models/userLogModel');

exports.fetchUserActivity = async () => {
    try {
        // Call the model method to fetch logs with names
        const logs = await getUserActivity();

        // Return logs data with user names
        return logs;
    } catch (error) {
        console.error(`Fetch User Activity With Names Service Error: ${error.message}`);
        throw new Error('Fetch User Activity With Names Service Error');
    }
};
