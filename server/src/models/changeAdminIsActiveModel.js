const sequelize = require('../config/dbConfig');

const updateAdminStatus = async (user_id, is_active) => {
  try {
    // Log the values to ensure they are being passed correctly
    console.log('User ID:', user_id);
    console.log('Is Active:', is_active);

    // Start a transaction
    const result = await sequelize.transaction(async (t) => {
      // 1. Update `is_active` in the `users` table
      const userUpdateQuery = `
        UPDATE users
        SET is_active = :is_active, updated_at = NOW()
        WHERE user_id = :user_id AND user_type IN (0, 3);
      `;
      await sequelize.query(userUpdateQuery, {
        replacements: { user_id: user_id, is_active: is_active },  // Ensure proper replacements
        type: sequelize.QueryTypes.UPDATE,
        transaction: t,
      });

      // 2. Update `is_active` in the `admin` table
      const adminUpdateQuery = `
        UPDATE admin
        SET is_active = :is_active
        WHERE user_id = :user_id;
      `;
      await sequelize.query(adminUpdateQuery, {
        replacements: { user_id: user_id, is_active: is_active },  // Ensure proper replacements
        type: sequelize.QueryTypes.UPDATE,
        transaction: t,
      });

      return { success: true };
    });

    return result;
  } catch (error) {
    console.error('Error updating admin status:', error);
    throw new Error('Error updating admin status');
  }
};

module.exports = { updateAdminStatus };
