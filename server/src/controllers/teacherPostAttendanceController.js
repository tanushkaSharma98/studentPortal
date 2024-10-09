const attendanceService = require('../services/teacherPostAttendanceService');

// const uploadAttendance = async (req, res) => {
//   try {
//     const { subjectCode, lecture, attendanceDate, attendanceList } = req.body;

//     // Check if attendanceList is an array
//     if (!Array.isArray(attendanceList) || attendanceList.length === 0) {
//       return res.status(400).json({ message: 'Attendance list is required and must be an array.' });
//     }

//     // Check if subjectCode, lecture, and attendanceDate are provided
//     if (!subjectCode || !lecture || !attendanceDate) {
//       return res.status(400).json({ message: 'Subject code, lecture, and attendance date are required.' });
//     }

//     // Call service to upload attendance
//     const uploadResult = await attendanceService.uploadAttendance(subjectCode, lecture, attendanceDate, attendanceList);

//     if (uploadResult.success) {
//       return res.status(200).json({ message: 'Attendance uploaded successfully' });
//     } else {
//       return res.status(500).json({ message: uploadResult.error || 'Failed to upload attendance' });
//     }
//   } catch (error) {
//     console.error('Error uploading attendance:', error);
//     res.status(500).json({ message: 'Error uploading attendance' });
//   }
// };

const uploadAttendance = async (req, res) => {
  try {
    const { subjectCode, lecture, attendanceDate, attendanceList } = req.body;

    // Validate input
    if (!Array.isArray(attendanceList) || attendanceList.length === 0) {
      return res.status(400).json({ message: 'Attendance list is required and must be an array.' });
    }

    if (!subjectCode || !lecture || !attendanceDate) {
      return res.status(400).json({ message: 'Subject code, lecture, and attendance date are required.' });
    }

    // Call service to upload attendance
    const uploadResult = await attendanceService.uploadAttendance(subjectCode, lecture, attendanceDate, attendanceList);

    if (uploadResult.success) {
      return res.status(200).json({ message: 'Attendance uploaded successfully' });
    } else {
      return res.status(500).json({ message: uploadResult.error || 'Failed to upload attendance' });
    }
  } catch (error) {
    console.error('Error uploading attendance:', error);
    res.status(500).json({ message: 'Error uploading attendance' });
  }
};


// GET to retrieve uploaded attendance
const getUploadedAttendance = async (req, res) => {
  try {
    const { subjectCode } = req.query;

    // Call service to get attendance data
    const attendanceData = await attendanceService.getUploadedAttendance(subjectCode);

    res.status(200).json(attendanceData);
  } catch (error) {
    console.error('Error fetching uploaded attendance:', error);
    res.status(500).json({ message: 'Error fetching uploaded attendance' });
  }
};

module.exports = {
  uploadAttendance,
  getUploadedAttendance,
};
