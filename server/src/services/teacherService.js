const { getTeacherDetailsById } = require('../models/teacherModel.js');

exports.getTeacherProfile = async (userId) => {
    try {
        const teacher = await getTeacherDetailsById(userId);
        return teacher;
    } catch (error) {
        throw new Error('Error fetching teacher profile: ' + error.message);
    }
};
