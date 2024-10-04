const sequelize = require('../config/dbConfig'); // Ensure the path to your dbConfig file is correct

const getStudentsBySubject = async (subjectCode) => {
  try {
    // Log the subjectCode to verify it is passed correctly
    console.log('Received subjectCode in model:', subjectCode);

    // Query to fetch students based on the subject code
    const studentQuery = `
      SELECT st.student_id, st.student_name, st.enrollment_no, st.branch_id, st.semester
      FROM branch_sem_sub bss
      JOIN subject s ON bss.subject_id = s.subject_id
      JOIN branch b ON b.branch_id = bss.branch_id
      JOIN student st ON st.branch_id = b.branch_id AND st.semester = bss.semester
      WHERE s.subject_code = :subjectCode
    `;

    // Execute the query using Sequelize's raw query feature
    const studentResult = await sequelize.query(studentQuery, {
      replacements: { subjectCode }, // Named replacement for subjectCode
      type: sequelize.QueryTypes.SELECT,
    });

    return studentResult; // Return all rows from the query result (multiple students)
  } catch (error) {
    console.error('Model Error: Failed to fetch students by subject', error);
    throw new Error('Model Error: Failed to fetch students');
  }
};

module.exports = { getStudentsBySubject };
