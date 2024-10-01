const createStudentService = require('../services/createStudentService');

exports.createStudent = async (req, res) => {
  try {
    const studentData = req.body;
    const result = await createStudentService.createStudent(studentData);
    res.status(201).json({ message: 'Student created successfully', student: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};