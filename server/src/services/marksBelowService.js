// services/marksService.js
const marksModel = require('../models/marksBelowModel');

// Function to get marks below threshold
const fetchStudentsBelowThreshold = async (subjectId, threshold) => {
  try {
      const students = await marksModel.getStudentsBelowThreshold(subjectId, threshold);
      return students;
  } catch (error) {
      console.error("Error in service fetching students below threshold:", error);
      throw error;
  }
};

module.exports = {
  fetchStudentsBelowThreshold,
};
