const  sequelize  = require('../config/dbConfig'); // Import sequelize instance
console.log(sequelize);


// Get subject details (subject_id, branch_id, semester) from Subject and BranchSemSub tables
const getSubjectDetails = async (subjectCode) => {
  const query = `
    SELECT s.subject_id, b.branch_id, b.semester
    FROM Subject s
    JOIN branch_sem_sub b ON s.subject_id = b.subject_id
    WHERE s.subject_code = :subjectCode;
  `;
  const result = await sequelize.query(query, {
    replacements: { subjectCode }, // Use Sequelize's replacement for values
    type: sequelize.QueryTypes.SELECT
  });
  // console.log('Subject details result:', result); // Debugging log
  return result[0]; // return subject_id, branch_id, semester
};

// Update marks for students into the Marks table
const updateMarksInDB = async (marksData) => {
  const transaction = await sequelize.transaction(); // Start transaction
  try {
    const query = `
      UPDATE Marks
      SET marks_obtained = :marksObtained
      WHERE student_id = :studentId AND subject_id = :subjectId AND exam_id = :examId
      RETURNING *;
    `;
    
    for (const mark of marksData) {
      await sequelize.query(query, {
        replacements: {
          marksObtained: mark.marks_obtained,
          studentId: mark.student_id,
          subjectId: mark.subject_id,
          examId: mark.exam_id
        },
        type: sequelize.QueryTypes.UPDATE,
        transaction
      });
    }
    await transaction.commit(); // Commit transaction if successful
  } catch (error) {
    await transaction.rollback(); // Rollback in case of an error
    throw error;
  }
};

module.exports = {
  getSubjectDetails,
  updateMarksInDB,
};
