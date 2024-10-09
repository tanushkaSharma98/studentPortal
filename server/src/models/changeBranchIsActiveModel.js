const sequelize = require('../config/dbConfig');  // Assuming dbConfig exports a sequelize instance

// Function to update the is_active status of a branch, corresponding users, and subjects
exports.updateBranchStatus = async (branch_id, is_active) => {
  try {
    const queryUpdateBranch = `
      UPDATE Branch
      SET is_active = :is_active
      WHERE branch_id = :branch_id
      RETURNING branch_id, branch_name, is_active;
    `;

    // Update the branch status
    const resultBranch = await sequelize.query(queryUpdateBranch, {
      replacements: { branch_id, is_active },
      type: sequelize.QueryTypes.UPDATE
    });

    // Get the list of user_ids associated with the students in this branch
    const queryGetUsers = `
      SELECT DISTINCT user_id
      FROM Student
      WHERE branch_id = :branch_id;
    `;

    const usersResult = await sequelize.query(queryGetUsers, {
      replacements: { branch_id },
      type: sequelize.QueryTypes.SELECT
    });

    const userIds = usersResult.map(user => user.user_id);

    // Update the is_active status of users
    if (userIds.length > 0) {
      const queryUpdateUsers = `
        UPDATE Users
        SET is_active = :is_active
        WHERE user_id IN (:userIds);
      `;

      await sequelize.query(queryUpdateUsers, {
        replacements: { is_active, userIds },
        type: sequelize.QueryTypes.UPDATE
      });
    }

    // Update the is_active status of subjects linked to the branch
    const queryUpdateSubjects = `
      UPDATE Subject
      SET is_active = :is_active
      WHERE subject_id IN (
        SELECT subject_id
        FROM branch_sem_sub
        WHERE branch_id = :branch_id
      );
    `;

    await sequelize.query(queryUpdateSubjects, {
      replacements: { is_active, branch_id },
      type: sequelize.QueryTypes.UPDATE
    });

    // Return the updated branch
    return resultBranch[0][0];  // The first row of the first result set
  } catch (error) {
    throw new Error('Error updating branch status: ' + error.message);
  }
};
