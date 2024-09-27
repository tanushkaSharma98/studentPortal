const cron = require('node-cron');
const { blacklistExpiredTokens } = require('../models/tokenBlacklistModel'); // Ensure correct path

// Schedule the job to run every hour (or any desired interval)
cron.schedule('0 * * * *', async () => {
    console.log('Running task to blacklist expired tokens...');
    await blacklistExpiredTokens();
});
