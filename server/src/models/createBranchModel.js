const sequelize = require('../config/dbConfig');  // Ensure the path to your dbConfig file is correct

// Function to create a new branch using raw SQL query
exports.createBranch = async (branchName) => {
    try {
        // Define the raw SQL query
        const query = `
            INSERT INTO branch (branch_name, is_active)
            VALUES (?, TRUE)
            RETURNING *;
        `;

        // Execute the query with replacements (for branch name)
        const [result] = await sequelize.query(query, {
            replacements: [branchName],
            type: sequelize.QueryTypes.INSERT
        });

        return result;  // Return the inserted branch
    } catch (error) {
        console.error('Model Error: Failed to insert branch', error);
        throw new Error('Model Error: Failed to create branch');
    }
};
