const sequelize = require('../config/dbConfig'); 

exports.getStudentCount= async () => {
    const result = await sequelize.query('SELECT COUNT(*) AS count FROM users WHERE user_type = 1 AND is_active = true;', {
      type: sequelize.QueryTypes.SELECT
    });
    return result[0].count;
};