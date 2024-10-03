const teacherSubModel = require('../models/teacherSubModel');

const getSubjectsByTeacher = async (userId) => {
    return await teacherSubModel.getSubjectsByTeacher(userId);
};

module.exports = { getSubjectsByTeacher };