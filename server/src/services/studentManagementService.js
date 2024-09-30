const { getStudentCount, updateStudentStatus } = require('../models/studentManagementModel');

exports.getStudentCount = async () => {
    try {
      const studentCount = await getStudentCount();
      return studentCount;
    } catch (error) {
      console.error("Error fetching student count:", error);
      throw new Error("Failed to fetch student count.");
    }
};

exports.changeStudentStatus = async (user_id, is_active) => {
  try {

      const result = await updateStudentStatus(user_id, is_active);

      return result;
  } catch (error) {
      console.error('Service Error: Failed to update student status', error);
      throw new Error('Service Error: Failed to update student status');
  }
};
