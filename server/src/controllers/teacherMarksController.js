const teacherPostMarksService = require('../services/teacherPostMarksService');

// Controller function to upload marks
const uploadMarks = async (req, res) => {
  try {
    const { exam_id, marks } = req.body;
    const usertype = req.user.user_type;

    if (usertype !== 2) {
        return res.status(403).json({ message: 'Unauthorized: Not a teacher!' });
    }
    // Validate marks
    if (!marks || !Array.isArray(marks) || marks.length === 0) {
      return res.status(400).json({ message: 'Marks data is required' });
    }

    // Validate each mark entry
    for (const mark of marks) {
      const { student_id, marks_obtained, subject_code } = mark;

      if (!student_id || !marks_obtained || !subject_code) {
        return res.status(400).json({
          message: 'Each mark entry must contain student_id, marks_obtained, and subject_id.'
        });
      }
    }

    // Validate exam ID
    if (!exam_id) {
      return res.status(400).json({ message: 'Exam ID is required' });
    }

    // Prepare marks data
    const marksData = await teacherPostMarksService.prepareMarksData(marks, exam_id);

    // Save marks in the database
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
    const usertype = req.user.user_type;

    if (usertype !== 2) {
        return res.status(403).json({ message: 'Unauthorized: Not a teacher!' });
    }
    // Trim the subjectCode to handle extra spaces
    const trimmedSubjectCode = subjectCode.trim();

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
