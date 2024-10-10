const sequelize = require('../config/dbConfig');

// Update attendance record for a specific student
async function updateAttendance(attendance_record_id, student_id, attendance, attended_lecture) {
    const query = `
        UPDATE attendance
        SET attendance = ?, attended_lecture = ?, updated_at = NOW()
        WHERE attendance_record_id = ? AND student_id = ?
    `;
    await sequelize.query(query, {
        replacements: [attendance, attended_lecture, attendance_record_id, student_id],
    });
}

module.exports = {
    updateAttendance,
};
