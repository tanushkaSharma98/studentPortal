const sequelize = require('../config/dbConfig');

// Fetch teacher by user_id
exports.getTeacherByUserId = async (user_id, transaction) => {
  const query = `SELECT * FROM teacher WHERE user_id = :user_id`;
  const [teacher] = await sequelize.query(query, {
    replacements: { user_id },
    type: sequelize.QueryTypes.SELECT,
    transaction,
  });
  return teacher;
};

exports.getUserByUserId = async (user_id, transaction) => {
    const query = `SELECT email, updated_at FROM users WHERE user_id = :user_id`;
    const [user] = await sequelize.query(query, {
      replacements: { user_id },
      type: sequelize.QueryTypes.SELECT,
      transaction,
    });
    return user;
  };

// Update teacher details
exports.updateTeacher = async (user_id, teacherUpdates, replacements, transaction) => {
  // Only update if there are changes
  if (!teacherUpdates.trim()) {
    throw new Error("No updates provided");
  }

  const query = `UPDATE teacher SET ${teacherUpdates} WHERE user_id = :user_id`;
  return await sequelize.query(query, {
    replacements: { ...replacements, user_id },
    transaction,
  });
};

// Update user details (for email)
exports.updateUser = async (user_id, userUpdates, replacements, transaction) => {
  // Only update if there are changes
  if (!userUpdates.trim()) {
    throw new Error("No updates provided");
  }

  const query = `UPDATE users SET ${userUpdates} WHERE user_id = :user_id`;
  return await sequelize.query(query, {
    replacements: { ...replacements, user_id },
    transaction,
  });
};
