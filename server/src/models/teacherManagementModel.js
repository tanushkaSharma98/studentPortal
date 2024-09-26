const sequelize = require('../config/dbConfig'); 

exports.getTeacherCount= async () => {
    const result = await sequelize.query('SELECT COUNT(*) AS count FROM users WHERE user_type = 2 AND is_active = true;', {
      type: sequelize.QueryTypes.SELECT
    });
    return result[0].count;
};