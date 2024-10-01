// module.exports = { getExamDetails };
const { getExamNames } = require('../models/exam_typeModel');

const getExamDetails = async (req, res) => {
  try {
    const examNames = await getExamNames();

    if (examNames && examNames.length > 0) {
      res.status(200).json(examNames);
    } else {
      res.status(404).json({ message: 'No exams found' });
    }
  } catch (error) {
    console.error('Error retrieving exam names:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getExamDetails };