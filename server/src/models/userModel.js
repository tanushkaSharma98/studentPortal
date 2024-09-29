const sequelize = require('../config/dbConfig');  // Assuming dbConfig exports a sequelize instance
const {secretKey} = require('../config/config.js');

const getUserByEmail = async (email) => {
  try {
      const query = `
          SELECT 
              user_id, 
              email, 
              pgp_sym_decrypt(password::BYTEA, :secretKey) AS decrypted_password, 
              user_type
          FROM 
              users
          WHERE 
              email = :email
              AND is_active = TRUE
      `;
      const result = await sequelize.query(query, {
          replacements: {email, secretKey: secretKey},
          type: sequelize.QueryTypes.SELECT
      });

      return result[0]; // Return the first row (user)
  } catch (error) {
      throw new Error('Error fetching user by email: ' + error.message);
  }
};

const storeToken = async (user_id, token, expires_at, created_at, is_blacklisted) => {
  const query = `
    INSERT INTO token_blacklist (user_id, token, expires_at, is_blacklisted, created_at) 
    VALUES (:user_id, :token, :expires_at, :is_blacklisted, :created_at)
    `;
  await sequelize.query(query, {
      replacements: { user_id, token, expires_at, created_at, is_blacklisted },
  });
};

  
  // Function to insert a token into the blacklist
  const blacklistToken = async (token) => {
    try {
        const query = `UPDATE token_blacklist SET is_blacklisted = TRUE WHERE token = :token`;
        await sequelize.query(query, {
            replacements: { token },
        });
        return true; // Return true indicating the token was successfully blacklisted
    } catch (error) {
        console.error(`Blacklist Token Error: ${error.message}`); // Handle errors
        throw new Error('Blacklist Token Error'); // Throw error for upstream handling
    }
};
  

module.exports = {
    getUserByEmail,
    blacklistToken,
    storeToken
};