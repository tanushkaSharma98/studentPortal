const sequelize = require('../config/dbConfig.js'); 

exports.getTeacherCount= async () => {
    const result = await sequelize.query('SELECT COUNT(*) AS count FROM users WHERE user_type = 2 AND is_active = true;', {
      type: sequelize.QueryTypes.SELECT
    });
    return result[0].count;
};

exports.updateTeacherStatus = async (user_id, is_active) => {
  try {
      // Start a transaction
      const result = await sequelize.transaction(async (t) => {
          // 1. Update `is_active` in the `users` table
          const userUpdateQuery = `
              UPDATE users
              SET is_active = :is_active, updated_at = NOW()
              WHERE user_id = :user_id  AND user_type = 2;
          `;
          await sequelize.query(userUpdateQuery, {
              replacements: { user_id, is_active },
              type: sequelize.QueryTypes.UPDATE,
              transaction: t
          });

          return { success: true };
      });

      return result;
  } catch (error) {
      console.error('Error updating student status:', error);
      throw new Error('Error updating student status');
  }
};