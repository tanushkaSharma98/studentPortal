const studentAttendanceModel = require('../models/studentAttendanceModel');

// Attendance data
const fetchAttendanceForStudent = async (student_id) => {
    try {
        return await studentAttendanceModel.getAttendanceData(student_id);
    } catch (error) {
        console.error(`Error fetching attendance for student ID ${student_id}:`, error);
        throw new Error('Unable to fetch attendance data.'); // Customize this message as needed
    }
};

// Attendance trend
const fetchAttendanceTrendForStudent = async (student_id) => {
    try {
        return await studentAttendanceModel.getAttendanceTrend(student_id);
    } catch (error) {
        console.error(`Error fetching attendance trend for student ID ${student_id}:`, error);
        throw new Error('Unable to fetch attendance trend.'); // Customize this message as needed
    }
};

// New function to fetch daily attendance records
const fetchDailyAttendanceForStudent = async (student_id) => {
    try {
        return await studentAttendanceModel.getDailyAttendanceData(student_id);
    } catch (error) {
        console.error(`Error fetching daily attendance for student ID ${student_id}:`, error);
        throw new Error('Unable to fetch daily attendance data.'); // Customize this message as needed
    }
};

module.exports = {
    fetchAttendanceForStudent,
    fetchAttendanceTrendForStudent,
    fetchDailyAttendanceForStudent
};
