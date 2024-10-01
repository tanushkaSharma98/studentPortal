// controllers/marksController.js
const marksService = require('../services/marksBelowService');

// Controller function for marks below threshold
const getStudentsBelowThreshold = async (req, res) => {
  const { subjectId, threshold } = req.query;

  try {
      const students = await marksService.fetchStudentsBelowThreshold(subjectId, threshold);
      res.status(200).json({
          success: true,
          data: students,
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: "Error fetching students below threshold",
      });
  }
};

module.exports = {
  getStudentsBelowThreshold,
};
