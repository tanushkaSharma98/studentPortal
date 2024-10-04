const teacherSubStudentService = require('../services/teacherSubStudentService');

// Controller to handle the request and return students
const getStudentsBySubject = async (req, res) => {
  try {
    const { subjectCode } = req.query;  // Extract subject_code from the query string

    // Log the incoming subjectCode to debug
    console.log('Received subjectCode in controller:', subjectCode);

    // If no subjectCode is provided, return a bad request response
    if (!subjectCode) {
      return res.status(400).json({ error: 'subjectCode is required' });
    }

    // Call service to get students by subject
    const students = await teacherSubStudentService.fetchStudentsBySubject(subjectCode);

    // Send response with the list of students
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

module.exports = {
  getStudentsBySubject,
};
