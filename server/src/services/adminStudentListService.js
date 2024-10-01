const { getAllStudents, getStudentsByBranchAndSemester, searchStudentsByName } = require('../models/adminStudentListModel');

exports.getAllStudents = async () => {
    try {
      const students = await getAllStudents();
      return students;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  // New service method to get students by branch and semester
  exports.getStudentsByBranchAndSemester = async (branchName, semester) => {
      try {
        const students = await getStudentsByBranchAndSemester(branchName, semester);
        return students;
      } catch (error) {
        throw new Error(error.message);
      }
    };
    
  // New service method to search students by name
  exports.searchStudentsByName = async (name) => {
      try {
        const students = await searchStudentsByName(name);
        return students;
      } catch (error) {
        throw new Error(error.message);
      }
  };