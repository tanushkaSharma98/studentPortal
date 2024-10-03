const teacherSubModel = require('../models/teacherSubModel');

const getSubjectsByTeacher = async (userId) => {
  try {
    const subjects = await teacherSubModel.getSubjectsByTeacher(userId);
    return subjects;
  } catch (error) {
    console.error('Error fetching subjects for teacher:', error);
    throw error; // Re-throw the error so it can be handled elsewhere if needed
  }
};

module.exports = { getSubjectsByTeacher };
