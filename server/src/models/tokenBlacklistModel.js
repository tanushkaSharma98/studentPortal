// tokenBlacklistModel.js
const sequelize = require('../config/dbConfig'); // Ensure correct path to your sequelize instance
exports.isTokenBlacklisted = async (token) => {
    const query = 'SELECT id FROM token_blacklist WHERE token = $1'; // SQL query to select a token from the blacklist
    const values = [token]; // Token parameter
    try {
        const result = await sequelize.query(query, {
            bind: values, // Bind parameters to the query
            type: sequelize.QueryTypes.SELECT // Specify the query type
        }); // Execute the query
        return result.length > 0; // Return true if the token is found, otherwise false
    } catch (error) {
        console.error(`Check Token Error: ${error.message}`); // Handle errors
        throw new Error('Check Token Error');
    }
};

exports.blacklistExpiredTokens = async () => {
    const now = new Date(); // Current date and time

    const query = `
        SELECT token FROM token_blacklist
        WHERE expiresAt < :now
    `;

    try {
        const result = await sequelize.query(query, {
            replacements: { now },
            type: sequelize.QueryTypes.SELECT
        });

        // Blacklist expired tokens
        for (const row of result) {
            await blacklistToken(row.token, now);
        }

        console.log('Expired tokens have been blacklisted successfully.');
    } catch (error) {
        console.error(`Error blacklisting expired tokens: ${error.message}`);
    }
};
