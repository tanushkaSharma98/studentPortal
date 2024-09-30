const { getTeacherProfile } = require('../services/teacherService');

exports.getTeacherProfile = async (req, res) => {
    try {
        const usertype = req.user.user_type;

        if (usertype !== 2) { // Assuming user_type 2 is for teachers
            return res.status(403).json({ message: 'Unauthorized: Not a teacher' });
        }

        const teacher = await getTeacherProfile(req.user.user_id);

        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        res.json(teacher);
    } catch (err) {
        res.status(500).json({ message: 'Error in teacher controller: ' + err.message });
    }
};
