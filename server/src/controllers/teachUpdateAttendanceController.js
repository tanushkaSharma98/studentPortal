const teachUpdateAttendanceService = require('../services/teachUpdateAttendanceService');

// Controller to handle attendance update
async function updateAttendance(req, res) {
    try {
        const { attendance_record_id, attendanceList } = req.body;

        if (!attendance_record_id || !attendanceList || !Array.isArray(attendanceList)) {
            return res.status(400).json({ message: 'Invalid input' });
        }

        // Iterate through the attendance list and update each student's attendance
        for (const attendanceEntry of attendanceList) {
            const { student_id, attendance, attended_lecture } = attendanceEntry;

            // Update each student's attendance
            await teachUpdateAttendanceService.updateAttendance(attendance_record_id, student_id, attendance, attended_lecture);
        }

        res.status(200).json({ message: 'Attendance updated successfully' });
    } catch (error) {
        console.error('Error updating attendance:', error);
        res.status(500).json({ message: 'Error updating attendance' });
    }
}

module.exports = {
    updateAttendance,
};
