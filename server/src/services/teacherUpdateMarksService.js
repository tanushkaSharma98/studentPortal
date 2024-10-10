const teacherUpdateMarksModel = require('../models/teacherUpdateMarksModel');

// Prepare marks data for update
const prepareMarksData = async (subjectCode, examId, marks) => {
  // Get subject details
  const subjectDetails = await teacherUpdateMarksModel.getSubjectDetails(subjectCode);
  const { subject_id } = subjectDetails;

  // Prepare data with subject_id and examId
  return marks.map((mark) => ({
    ...mark,
    subject_id,
    exam_id: examId,
  }));
};

// Update marks in the database
const updateMarks = async (marksData) => {
  await teacherUpdateMarksModel.updateMarksInDB(marksData);
};

module.exports = {
  prepareMarksData,
  updateMarks,
};
