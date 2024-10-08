const {getTeacherCount, updateTeacherStatus} = require('../models/teacherManagementModel');

exports.getTeacherCount = async () => {
    try {
      const teacherCount = await getTeacherCount();
      return teacherCount;
    } catch (error) {
      console.error("Error fetching teacher count:", error);
      throw new Error("Failed to fetch teacher count.");
    }
};

exports.changeTeacherStatus = async (user_id, is_active) => {
  try {

      const result = await updateTeacherStatus(user_id, is_active);

      return result;
  } catch (error) {
      console.error('Service Error: Failed to update Teacher status', error);
      throw new Error('Service Error: Failed to update Teacher status');
  }
};