const { getTeacherCount, getAllTeachers, getTeachersByBranchAndSemester, searchTeachersByName } = require('../models/teacherManagementModel');

exports.getTeacherCount = async () => {
    try {
      const teacherCount = await getTeacherCount();
      return teacherCount;
    } catch (error) {
      console.error("Error fetching teacher count:", error);
      throw new Error("Failed to fetch teacher count.");
    }
};

exports.getAllTeachers = async () => {
  try {
    return await getAllTeachers();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Fetch teachers by branch and semester
exports.getTeachersByBranchAndSemester = async (branchName, semester) => {
  try {
    return await getTeachersByBranchAndSemester(branchName, semester);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Search teachers by name
exports.searchTeachersByName = async (name) => {
  try {
    return await searchTeachersByName(name);
  } catch (error) {
    throw new Error(error.message);
  }
};