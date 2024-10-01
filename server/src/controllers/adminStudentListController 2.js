const { getAllStudents, getStudentsByBranchAndSemester, searchStudentsByName } = require('../services/adminStudentListService');

exports.getAllStudents = async (req, res) => {
    try {
      const students = await getAllStudents();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // New method to get students by branch and semester
  exports.getStudentsByBranchAndSemester = async (req, res) => {
      const { branch_name, semester } = req.query;
    
      try {
        const students = await getStudentsByBranchAndSemester(branch_name, semester);
        res.status(200).json(students);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  };
  
  // New method to search students by name
  exports.searchStudentsByName = async (req, res) => {
     
      let { name } = req.query;
  // Check if name is defined and not empty
  if (!name) {
    return res.status(400).json({ message: "Name parameter is required" });
  }
    // Trim any extra spaces from the name input
    const trimmedName = name.trim();
  
    
      try {
        const students = await searchStudentsByName(trimmedName);
        res.status(200).json(students);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  };