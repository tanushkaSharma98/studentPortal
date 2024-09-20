const { getStudentDetailsById } = require('../models/studentModel.js');

exports.getStudentProfile = async (userId) => {
    console.log(userId);
    try {
        const student = await getStudentDetailsById(userId);
        return student;
    } catch (error) {
        throw new Error('Error fetching student profile');
    }
};