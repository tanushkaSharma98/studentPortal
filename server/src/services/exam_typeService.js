const exam_typeModel = require('../models/exam_typeModel');

const fetchAllExams = async () => {
  try {
    // Call the Sequelize method to get all exams
    const result = await exam_typeModel.getExamNames();
    return result;  // No need to extract .rows, Sequelize handles this.
  } catch (error) {
    throw new Error('Failed to retrieve exam types');
  }
};

module.exports = {
  fetchAllExams,
};