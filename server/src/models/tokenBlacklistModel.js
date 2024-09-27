const sequelize = require('../config/dbConfig');
const moment = require('moment-timezone');
const { blacklistToken } = require('./userModel');

exports.getAllTokens = async () => {
    const query = 'SELECT token FROM token_blacklist WHERE is_blacklisted = FALSE'; // Modify as needed

    try {
        const result = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT // Specify the query type
        });

        return result; // Return the list of tokens
    } catch (error) {
        console.error(`Error fetching tokens: ${error.message}`);
        throw new Error('Error fetching tokens');
    }
};
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
    const now = moment.tz(Date.now(), 'Asia/Kolkata').toDate(); // Current date and time

    const query = `
        SELECT token FROM token_blacklist
        WHERE expires_at < :now AND is_blacklisted = FALSE  -- Only select unblacklisted expired tokens
    `;

    try {
        const result = await sequelize.query(query, {
            replacements: { now },
            type: sequelize.QueryTypes.SELECT
        });

        let blacklistedCount = 0; // Counter for blacklisted tokens

        // Blacklist expired tokens
        for (const row of result) {
            // Call your function to blacklist the token in the database
            await blacklistToken(row.token);  // Assuming blacklistToken updates the is_blacklisted field to true
            blacklistedCount++; // Increment the counter
        }

        if (blacklistedCount > 0) {
            console.log('Expired tokens have been blacklisted successfully.');
            return { success: true, message: `${blacklistedCount} tokens have been blacklisted.` }; // Return success message
        } else {
            return { success: false, message: 'No expired tokens to blacklist.' }; // No tokens were blacklisted
        }
    } catch (error) {
        console.error(`Error blacklisting expired tokens: ${error.message}`);
        return { success: false, message: 'Error occurred while blacklisting tokens.' }; // Return error message
    }
};