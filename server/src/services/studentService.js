const { getStudentDetailsById } = require('../models/studentModel.js');

exports.getStudentProfile = async (userId) => {
    console.log('Fetching student profile for userId:', userId);

    // Optionally validate userId format (if necessary)
    if (!userId) {
        throw new Error('Invalid userId provided');
    }

    try {
        const student = await getStudentDetailsById(userId);

        if (!student) {
            throw new Error('Student not found');
        }

        return student;
    } catch (error) {
        console.error('Error fetching student profile:', error);
        throw new Error('Error fetching student profile: ' + error.message);
    }
};
