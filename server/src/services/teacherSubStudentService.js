const teacherSubStudentModel = require('../models/teacherSubStudentModel');

const fetchStudentsBySubject = async (subjectCode) => {
    try {
        // Call model to get students by subject
        const students = await teacherSubStudentModel.getStudentsBySubject(subjectCode);

        if (students.length === 0) {
            throw new Error('No students found for the selected subject.');
        }

        return students;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    fetchStudentsBySubject
};