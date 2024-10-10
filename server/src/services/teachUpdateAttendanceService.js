const teachUpdateAttendanceModel = require('../models/teachUpdateAttendanceModel');

// Service to update attendance for a student
async function updateAttendance(attendance_record_id, student_id, attendance, attended_lecture) {
    await teachUpdateAttendanceModel.updateAttendance(attendance_record_id, student_id, attendance, attended_lecture);
}

module.exports = {
    updateAttendance,
};
