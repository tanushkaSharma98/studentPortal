const { getTeacherCount, getAllTeachers, getTeachersByBranchAndSemester, searchTeachersByName } = require('../services/teacherManagementService')

exports.getTeacherCount= async (req, res) => {
    try {

        const userType = req.user.user_type;
        if (userType !== 0 && userType !== 3) {
            return res.status(403).json({ message: 'Access denied. Only admins can see teacher data.' });
        }
        const count = await getTeacherCount();
        res.status(200).json({ teacherCount: count });
        } catch (error) {
        res.status(500).json({ error: 'Error fetching student count' });
    }
};

exports.getAllTeachers = async (req, res) => {
    try {

        const userType = req.user.user_type;
        if (userType !== 0 && userType !== 3) {
            return res.status(403).json({ message: 'Access denied. Only admins can see teacher data.' });
        }
        const teachers = await getAllTeachers();
        res.status(200).json(teachers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Fetch teachers by branch and semester
  exports.getTeachersByBranchAndSemester = async (req, res) => {
    const { branchName, semester } = req.query;
  
    try {

        const userType = req.user.user_type;
        if (userType !== 0 && userType !== 3) {
            return res.status(403).json({ message: 'Access denied. Only admins can see teacher data.' });
        }
        const teachers = await getTeachersByBranchAndSemester(branchName, semester);
        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };
  
  // Search teachers by name
  exports.searchTeachersByName = async (req, res) => {
    let { name } = req.query;
  
    // Trim any extra spaces from the name input
    const trimmedName = name.trim();
  
    try {

        const userType = req.user.user_type;
        if (userType !== 0 && userType !== 3) {
            return res.status(403).json({ message: 'Access denied. Only admins can see teacher data.' });
        }
        const teachers = await searchTeachersByName(trimmedName);
        res.status(200).json(teachers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
