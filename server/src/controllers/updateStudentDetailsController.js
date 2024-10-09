const {updateStudent} = require('../services/updateStudentDetailsService');

exports.updateStudentDetails = async (req, res) => {
  try {
    const { student_name, user_id, enrollment_no, branch_name, semester, contact_no, email } = req.body;

    // Call the service to update student details
    const result = await updateStudent(user_id, {
      student_name,
      enrollment_no,
      branch_name,
      semester,
      contact_no,
      email,
    });

    if (!result.success) {
      return res.status(404).json({ message: 'Student not found or no changes detected' });
    }

    return res.status(200).json({ message: 'Student details updated successfully', data: result.data });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating student details', error: error.message });
  }
};