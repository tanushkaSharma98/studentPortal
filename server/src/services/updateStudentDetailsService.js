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
  const query = `SELECT * FROM users WHERE user_id = :user_id`;
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

const studentModel = require('../models/updateStudentDetailsModel');

exports.updateStudent = async (user_id, updateData) => {
  const { student_name, enrollment_no, branch_name, semester, contact_no, email } = updateData;

  // Start a transaction
  const t = await sequelize.transaction();

  try {
    // Fetch current student and user details using the model
    const student = await studentModel.getStudentByUserId(user_id, t);
    const user = await studentModel.getUserByUserId(user_id, t);

    if (!student || !user) {
      await t.rollback();
      return { success: false };
    }

    // Build update queries dynamically based on changes
    let studentUpdates = '';
    let userUpdates = '';
    const replacements = { user_id };

    if (student_name && student.student_name !== student_name) {
      studentUpdates += 'student_name = :student_name, ';
      replacements.student_name = student_name;
    }

    if (enrollment_no && student.enrollment_no !== enrollment_no) {
      studentUpdates += 'enrollment_no = :enrollment_no, ';
      replacements.enrollment_no = enrollment_no;
    }

    if (contact_no && student.contact_no !== contact_no) {
      studentUpdates += 'contact_no = :contact_no, ';
      replacements.contact_no = contact_no;
    }

    if (email && user.email !== email) {
      userUpdates += 'email = :email, ';
      replacements.email = email;
    }

    if (semester && student.semester !== semester) {
      studentUpdates += 'semester = :semester, ';
      replacements.semester = semester;

      // Only update branch_id if semester is 1 or 2 and branch_name exists
      if ((semester === 1 || semester === 2) && branch_name) {
        const branch_id = await studentModel.getBranchIdByName(branch_name, t);
        if (branch_id && student.branch_id !== branch_id) {
          studentUpdates += 'branch_id = :branch_id, ';
          replacements.branch_id = branch_id;
        }
      }
    }

    // Update the updated_at field
    const currentTime = new Date();
    replacements.updated_at = currentTime;

    // Ensure to include updated_at in both updates
    studentUpdates += 'updated_at = :updated_at';
    userUpdates += 'updated_at = :updated_at';

    // Perform student and user updates via model
    if (studentUpdates.trim()) {
      await studentModel.updateStudent(user_id, studentUpdates, replacements, t);
    }

    if (userUpdates.trim()) {
      await studentModel.updateUser(user_id, userUpdates, replacements, t);
    }

    // Commit transaction
    await t.commit();

    return { success: true, data: { student} };
  } catch (error) {
    // Rollback transaction in case of failure
    await t.rollback();
    throw new Error(error.message);
  }
};
