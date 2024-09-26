const { getTeacherCount } = require('../models/teacherManagementModel');

exports.getTeacherCount = async () => {
    try {
      const teacherCount = await getTeacherCount();
      return teacherCount;
    } catch (error) {
      console.error("Error fetching teacher count:", error);
      throw new Error("Failed to fetch teacher count.");
    }
};
  