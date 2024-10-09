const teacherModel = require('../models/updateTeacherDetailsModel');
const sequelize = require('../config/dbConfig');

exports.updateTeacher = async (user_id, updateData) => {
  const { teacher_name, designation, contact_no, email } = updateData;

  // Start a transaction
  const t = await sequelize.transaction();

  try {
    // Fetch current teacher and user details
    const teacher = await teacherModel.getTeacherByUserId(user_id, t);
    const user = await teacherModel.getUserByUserId(user_id, t); // Fetch user details

    if (!teacher || !user) {
      await t.rollback();
      return { success: false };
    }

    // Build update queries dynamically based on changes
    let teacherUpdates = '';
    let userUpdates = '';
    const replacements = { user_id }; // Initialize replacements with user_id
    const currentTime = new Date(); // Get the current time for updated_at

    if (teacher_name && teacher.teacher_name !== teacher_name) {
      teacherUpdates += 'teacher_name = :teacher_name, ';
      replacements.teacher_name = teacher_name;
    }

    if (designation && teacher.designation !== designation) {
      teacherUpdates += 'designation = :designation, ';
      replacements.designation = designation;
    }

    if (contact_no && teacher.contact_no !== contact_no) {
      teacherUpdates += 'contact_no = :contact_no, ';
      replacements.contact_no = contact_no;
    }

    if (email && user.email !== email) {
      userUpdates += 'email = :email, ';
      replacements.email = email;
    }

    // Trim any trailing commas and whitespace
    teacherUpdates = teacherUpdates.replace(/,\s*$/, '');
    userUpdates = userUpdates.replace(/,\s*$/, '');

    // Always add the updated_at field to both updates
    teacherUpdates += (teacherUpdates ? ', ' : '') + 'updated_at = :updated_at'; // Update updated_at for teacher
    userUpdates += (userUpdates ? ', ' : '') + 'updated_at = :updated_at'; // Update updated_at for user
    replacements.updated_at = currentTime; // Include updated_at in replacements

    // Perform teacher and user updates via model
    if (teacherUpdates) {
      await teacherModel.updateTeacher(user_id, teacherUpdates, replacements, t);
    }

    if (userUpdates) {
      await teacherModel.updateUser(user_id, userUpdates, replacements, t);
    }

    const updatedTeacher = await teacherModel.getTeacherByUserId(user_id, t);
    const updatedUser = await teacherModel.getUserByUserId(user_id, t);

    // Commit transaction
    await t.commit();

    return { success: true, data: { updatedTeacher, updatedUser } };
  } catch (error) {
    // Rollback transaction in case of failure
    await t.rollback();
    throw new Error(error.message);
  }
};
