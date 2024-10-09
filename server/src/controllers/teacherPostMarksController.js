const teacherPostMarksService = require('../services/teacherPostMarksService');

// Controller function to upload marks
const uploadMarks = async (req, res) => {
  try {
    const { examId, marks } = req.body;

    // Check if marks are being sent correctly
    if (!marks || !Array.isArray(marks) || marks.length === 0) {
      return res.status(400).json({ message: 'Marks data is required' });
    }

    // Log received marks for debugging
    console.log('Received marks:', marks);

    // Assuming the subject_code is provided in the first mark entry
    const subjectCode = marks[0].subject_code; // Use subject_code from the first entry
    if (!subjectCode) {
      return res.status(400).json({ message: 'Subject code is required' });
    }

    // Prepare marks data and fetch subject details
    const marksData = await teacherPostMarksService.prepareMarksData(subjectCode, examId, marks);

    // Call service to save marks in the database
    await teacherPostMarksService.saveMarks(marksData);

    res.status(200).json({ message: 'Marks uploaded successfully' });
  } catch (error) {
    console.error('Error uploading marks:', error.message);
    res.status(500).json({ message: 'Error uploading marks', error: error.message });
  }
};

// New controller function to get marks for a given subject
const getMarks = async (req, res) => {
  try {
    let { subjectCode } = req.query;

    // Trim the subjectCode to handle extra spaces
    const trimmedSubjectCode = subjectCode.trim();

    // Ensure subjectCode is provided
    if (!trimmedSubjectCode) {
      return res.status(400).json({ message: 'Subject code is required' });
    }

    // Fetch marks for the subject using the service
    const marksData = await teacherPostMarksService.getMarksForSubject(trimmedSubjectCode);

    // Return marks data
    res.status(200).json(marksData);
  } catch (error) {
    console.error('Error retrieving marks:', error.message);
    res.status(500).json({ message: 'Error retrieving marks', error: error.message });
  }
};

module.exports = {
  uploadMarks,
  getMarks,
};
