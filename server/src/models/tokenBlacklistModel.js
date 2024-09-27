// tokenBlacklistModel.js
const sequelize = require('../config/dbConfig');
const moment = require('moment-timezone');
exports.isTokenBlacklisted = async (token) => {
    const query = 'SELECT id FROM token_blacklist WHERE token = :token AND is_blacklisted = TRUE'; // Updated SQL query to check if the token is blacklisted
    try {
        const result = await sequelize.query(query, {
            replacements: { token }, // Use named replacements instead of positional parameters
            type: sequelize.QueryTypes.SELECT // Specify the query type
        });
        return result.length > 0; // Return true if the token is found and blacklisted, otherwise false
    } catch (error) {
        console.error(`Check Token Error: ${error.message}`); // Handle errors
        throw new Error('Check Token Error');
    }
};

exports.blacklistExpiredTokens = async () => {
    const now =  moment.tz(Date.now(), 'Asia/Kolkata').toDate(); // Current date and time

    const query = `
        SELECT token FROM token_blacklist
        WHERE expires_at < :now AND is_blacklisted = FALSE  -- Only select unblacklisted expired tokens
    `;

    try {
        const result = await sequelize.query(query, {
            replacements: { now },
            type: sequelize.QueryTypes.SELECT
        });

        // Blacklist expired tokens
        for (const row of result) {
            await blacklistToken(row.token);  // No need to pass `now` to `blacklistToken`
        }

        console.log('Expired tokens have been blacklisted successfully.');
    } catch (error) {
        console.error(`Error blacklisting expired tokens: ${error.message}`);
    }
};
