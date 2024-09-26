const { getStudentCount } = require('../models/studentManagementModel');

exports.getStudentCount = async () => {
    try {
      const studentCount = await getStudentCount();
      return studentCount;
    } catch (error) {
      console.error("Error fetching student count:", error);
      throw new Error("Failed to fetch student count.");
    }
};
  