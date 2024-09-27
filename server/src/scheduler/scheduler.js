const cron = require('node-cron');
const jwt = require('jsonwebtoken');
const { blacklistExpiredTokens } = require('../models/tokenBlacklistModel'); // Ensure correct path
require('dotenv').config({ path: 'src/.env' });

// Schedule the job to run every 10 minutes
cron.schedule('*/10 * * * *', async () => {
    console.log('Running task to blacklist expired tokens...');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        await blacklistExpiredTokens();

        await logUserLogout(decoded.user_id, new Date());
        console.log('Expired tokens have been successfully blacklisted.');
    } catch (error) {
        console.error(`Error during the blacklist token cron job: ${error.message}`);
    }
});
