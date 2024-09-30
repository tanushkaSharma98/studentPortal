const sequelize = require('../config/dbConfig');
const {secretKey} = require('../config/config.js');
// Function to update the user's password in the database
exports.updateUserPassword = async (user_id, newPassword) => {
  try {
    const query = `
      UPDATE users
      SET password = pgp_sym_encrypt(:newPassword, :secretKey), updated_at = NOW()
      WHERE user_id = :user_id;
    `;

    await sequelize.query(query, {
      replacements: {
        user_id,
        newPassword,
        secretKey,
      },
      type: sequelize.QueryTypes.UPDATE,
    });
    
    return true;
  } catch (error) {
    throw new Error('Error updating password in the database: ' + error.message);
  }
};
