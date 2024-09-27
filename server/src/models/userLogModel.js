const sequelize = require('../config/dbConfig');

exports.logUserLogin = async (userId, timestamp) => {
    const query = 'INSERT INTO user_logs (user_id, action, timestamp) VALUES ($1, $2, $3)';
    const values = [userId, 'login', timestamp];
    try {
        await sequelize.query(query, { bind: values });
    } catch (error) {
        console.error(`Log User Login Error: ${error.message}`);
        throw new Error('Log User Login Error');
    }
};

exports.logUserLogout = async (userId, timestamp) => {
    const query = 'INSERT INTO user_logs (user_id, action, timestamp) VALUES ($1, $2, $3)';
    const values = [userId, 'logout', timestamp];
    try {
        await sequelize.query(query, { bind: values });
    } catch (error) {
        console.error(`Log User Logout Error: ${error.message}`);
        throw new Error('Log User Logout Error');
    }
};