const teacherSubStudentModel = require('../models/teacherSubStudentModel');

// Service to fetch students by subject code
const fetchStudentsBySubject = async (subjectCode) => {
  try {
    // Log to ensure the service receives the subjectCode
    console.log('Received subjectCode in service:', subjectCode);

    // Call the model function to get students based on subjectCode
    const students = await teacherSubStudentModel.getStudentsBySubject(subjectCode);
    return students;
  } catch (error) {
    console.error('Service Error: Failed to fetch students', error);
    throw new Error('Service Error: Failed to fetch students');
  }
};

module.exports = { fetchStudentsBySubject };
