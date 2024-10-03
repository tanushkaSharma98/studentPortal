const attendanceModel = require('../models/teacherPostAttendanceModel');

const uploadAttendance = async (subjectCode, lecture, attendanceDate, attendanceList) => {
  try {
    const subjectId = await attendanceModel.getSubjectIdByCode(subjectCode);

    if (!subjectId) {
      return { success: false, error: 'Subject not found' };
    }

    // Create an attendance record
    const attendanceRecordId = await attendanceModel.createAttendanceRecord(subjectId, lecture, attendanceDate);
    console.log('Created Attendance Record ID:', attendanceRecordId); // Log the created ID

    // Loop through the attendance list and insert records
    for (const entry of attendanceList) {
      const { enrollmentNo, attendance } = entry;
      const studentId = await attendanceModel.getStudentIdByEnrollmentNo(enrollmentNo);

      if (!studentId) {
        return { success: false, error: `Student with enrollment number ${enrollmentNo} not found` };
      }

      // Ensure the attendanceRecordId is defined before calling insertAttendanceRecord
      if (!attendanceRecordId) {
        return { success: false, error: 'Attendance record ID is not valid' };
      }

      await attendanceModel.insertAttendanceRecord(studentId, attendanceRecordId, attendance, subjectId);
    }

    return { success: true };
  } catch (error) {
    console.error('Error in uploadAttendance service:', error);
    return { success: false, error: 'Error uploading attendance' };
  }
};

// Retrieve uploaded attendance
const getUploadedAttendance = async (subjectCode) => {
  const subjectId = await attendanceModel.getSubjectIdByCode(subjectCode);
  if (!subjectId) throw new Error('Subject not found');

  const attendanceData = await attendanceModel.getAttendanceDataBySubjectId(subjectId);
  return attendanceData;
};

module.exports = {
  uploadAttendance,
  getUploadedAttendance,
};
