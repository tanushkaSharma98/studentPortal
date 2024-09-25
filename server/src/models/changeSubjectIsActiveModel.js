const sequelize = require('../config/dbConfig');  // Assuming dbConfig exports a sequelize instance

// Function to update the is_active status of a subject
const updateSubjectStatus = async (subject_id, is_active) => {
  try {
    const query = `
      UPDATE Subject
      SET is_active = :is_active, updated_at = NOW()
      WHERE subject_id = :subject_id
      RETURNING subject_id, subject_name, is_active;
    `;
    const result = await sequelize.query(query, {
      replacements: { subject_id, is_active },
      type: sequelize.QueryTypes.UPDATE
    });

    // Return the updated subject
    return result[0][0];  // The first row of the first result set
  } catch (error) {
    throw new Error('Error updating subject status: ' + error.message);
  }
};

module.exports = {
  updateSubjectStatus
};
