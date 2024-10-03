const teacherSubStudentService = require('../services/teacherSubStudentService');

// Controller to handle the request and return students
const getStudentsBySubject = async (req, res) => {
    try {
        const { subjectCode } = req.query;  // Extract subject_code from the request params

        // Call service to get students
        const students = await teacherSubStudentService.fetchStudentsBySubject(subjectCode);

        // Send response with the list of students
        res.status(200).json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};

module.exports = {
    getStudentsBySubject
};