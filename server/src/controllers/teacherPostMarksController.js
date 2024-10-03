const teacherPostMarksService = require('../services/teacherPostMarksService');

const uploadMarks = async (req, res) => {
  try {
    const { subjectName, examId, marks } = req.body;

    // Prepare marks data
    const { marksData } = await teacherPostMarksService.prepareMarksData(subjectName, examId, marks);

    // Save marks in the database
    await teacherPostMarksService.saveMarks(marksData, examId); // Pass examId to saveMarks

    res.status(200).json({ message: 'Marks uploaded successfully' });
  } catch (error) {
    console.error('Error uploading marks:', error);
    res.status(500).json({ message: 'Error uploading marks' });
  }
};

module.exports = {
  uploadMarks,
  // Other exports...
};
