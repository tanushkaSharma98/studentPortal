const { getTeacherDetailsById } = require('../models/teacherModel.js');

exports.getTeacherProfile = async (userId) => {
    console.log(userId);
    try {
        const teacher = await getStudentDetailsById(userId);
        return teacher;
    } catch (error) {
        throw new Error('Error fetching teacherprofile');
    }
};