const cron = require('node-cron');
const jwt = require('jsonwebtoken');
const { getAllTokens, blacklistExpiredTokens } = require('../models/tokenBlacklistModel'); // Ensure correct path
const { logUserLogout } = require('../models/userLogModel'); // Ensure correct path
require('dotenv').config({ path: 'src/.env' });

cron.schedule('*/10 * * * *', async () => {
    console.log('Running task to blacklist expired tokens...');
    try {
        const tokens = await getAllTokens(); // Fetch tokens from the database

        const expiredTokens = []; // Array to store expired tokens for logging

        for (const token of tokens) {
            try {
                const decoded = jwt.verify(token.token, process.env.JWT_SECRET); // Ensure 'token' is the correct field
                // You can log the decoded information if needed
                console.log(`Processing token for user ID: ${decoded.user_id}`);
            } catch (tokenError) {
                console.error(`Error verifying token ${token.token}: ${tokenError.message}`);
                expiredTokens.push(token); // Add the token to the list of expired tokens
            }
        }

        // Blacklist expired tokens
        const result = await blacklistExpiredTokens();

        if (result.success) {
            // Loop through expired tokens and log user logout actions
            for (const token of expiredTokens) {
                const decoded = jwt.verify(token.token, process.env.JWT_SECRET);
                await logUserLogout(decoded.user_id, new Date());
            }
        }

        console.log('Expired tokens have been successfully blacklisted.');
    } catch (error) {
        console.error(`Error during the blacklist token cron job: ${error.message}`);
    }
});
