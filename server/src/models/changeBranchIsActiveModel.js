const sequelize = require('../config/dbConfig');  // Assuming dbConfig exports a sequelize instance

// Function to update the is_active status of a subject
exports.updateBranchStatus = async (branch_id, is_active) => {
  try {
    const query = `
      UPDATE Branch
      SET is_active = :is_active
      WHERE branch_id = :branch_id
      RETURNING branch_id, branch_name, is_active;
    `;
    const result = await sequelize.query(query, {
      replacements: { branch_id, is_active },
      type: sequelize.QueryTypes.UPDATE
    });

    // Return the updated subject
    return result[0][0];  // The first row of the first result set
  } catch (error) {
    throw new Error('Error updating branch status: ' + error.message);
  }
};
