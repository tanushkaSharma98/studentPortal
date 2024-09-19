const sequelize = require('../config/dbConfig'); 
const { secretKey } = require('../config/config.js');

// Function to create User and Admin in a single operation
const createUserAndAdmin = async (name, email, password) => {
    try {
        
        // Start a transaction to ensure atomicity
        const result = await sequelize.transaction(async (t) => {
            // 1. Insert into the `users` table (raw SQL query with encrypted password)
            const userQuery = `
                INSERT INTO users (email, password, user_type, created_at, updated_at, deleted_at, is_active)
                VALUES (:email, pgp_sym_encrypt(:password, :secretKey), 3, NOW(), NOW(), NULL, TRUE)
                RETURNING user_id;
            `;
            const userResult = await sequelize.query(userQuery, {
                replacements: { email, password, secretKey},
                type: sequelize.QueryTypes.INSERT,
                transaction: t
            });

            const userId = userResult[0][0].user_id;

            // 2. Insert into the `admin` table using the `user_id`
            const adminQuery = `
                INSERT INTO admin (user_id, name, is_active, created_at, last_login)
                VALUES (:user_id, :name, TRUE, NOW(), NOW())
                RETURNING *;
            `;
            const adminResult = await sequelize.query(adminQuery, {
                replacements: { user_id: userId, name },
                type: sequelize.QueryTypes.INSERT,
                transaction: t
            });

            return { user_id: userId, admin: adminResult[0][0] };
        });

        return result;
    } catch (error) {
        console.error('Error creating user and admin:', error);
        throw new Error('Error creating user and admin');
    }
};

module.exports = { createUserAndAdmin };
