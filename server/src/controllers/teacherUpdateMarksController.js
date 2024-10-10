const teacherUpdateMarksService = require('../services/teacherUpdateMarksService');

// PUT: Update student marks
const updateMarks = async (req, res) => {
  try {
    const { subjectCode, examId, marks } = req.body;

    if (!subjectCode || !examId || !marks) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    // Prepare the updated marks data
    const marksData = await teacherUpdateMarksService.prepareMarksData(subjectCode, examId, marks);

    // Update marks in the database
    await teacherUpdateMarksService.updateMarks(marksData);

    res.status(200).json({ message: 'Marks updated successfully' });
  } catch (error) {
    console.error('Error updating marks:', error);
    res.status(500).json({ message: 'Error updating marks' });
  }
};

module.exports = {
  updateMarks,
};
