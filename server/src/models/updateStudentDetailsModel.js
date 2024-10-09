const sequelize = require('../config/dbConfig');

// Fetch student by user_id
exports.getStudentByUserId = async (user_id, transaction) => {
  const query = `SELECT * FROM student WHERE user_id = :user_id`;
  const [student] = await sequelize.query(query, {
    replacements: { user_id },
    type: sequelize.QueryTypes.SELECT,
    transaction,
  });
  return student;
};

// Fetch user by user_id
exports.getUserByUserId = async (user_id, transaction) => {
  const query = `SELECT email, updated_at FROM users WHERE user_id = :user_id`;
  const [user] = await sequelize.query(query, {
    replacements: { user_id },
    type: sequelize.QueryTypes.SELECT,
    transaction,
  });
  return user;
};

// Update student details
exports.updateStudent = async (user_id, studentUpdates, replacements, transaction) => {
  const query = `UPDATE student SET ${studentUpdates} WHERE user_id = :user_id`;
  return await sequelize.query(query, {
    replacements: { ...replacements, user_id },
    transaction,
  });
};

// Update user details
exports.updateUser = async (user_id, userUpdates, replacements, transaction) => {
  const query = `UPDATE users SET ${userUpdates} WHERE user_id = :user_id`;
  return await sequelize.query(query, {
    replacements: { ...replacements, user_id },
    transaction,
  });
};

// Fetch branch_id by branch_name
exports.getBranchIdByName = async (branch_name, transaction) => {
  const query = `SELECT branch_id FROM branches WHERE branch_name = :branch_name`;
  const [branch] = await sequelize.query(query, {
    replacements: { branch_name },
    type: sequelize.QueryTypes.SELECT,
    transaction,
  });
  return branch ? branch.branch_id : null;
};
