const teacherSubService = require('../services/teacherSubService');

const getSubjectsByTeacher = async (req, res) => {
    try {
        const userId = req.user.user_id;  

        //console.log("Received teacher_id:", teacher_id);

        const subjects = await teacherSubService.getSubjectsByTeacher(userId);

        if (subjects.length === 0) {
            return res.status(404).json({ error: 'No subjects found for this teacher' });
        }

        res.status(200).json(subjects);  // Send back the subjects
    } catch (error) {
       // Log the full error to get more information
       console.error("Error in getSubjectsByTeacher:", error);

        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

module.exports = { getSubjectsByTeacher };