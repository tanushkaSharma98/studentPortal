const { getAllTeachers, getTeachersByBranchAndSemester, searchTeachersByName } = require('../models/adminTeacherListModel');

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