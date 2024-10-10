const { getTeacherProfile, uploadAttendance, getUploadedAttendance } = require('../services/teacherService');

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

exports.uploadAttendance = async (req, res) => {
    try {
      const { subjectCode, lecture, attendanceDate, attendanceList } = req.body;
  
      // Check if attendanceList is an array
      if (!Array.isArray(attendanceList) || attendanceList.length === 0) {
        return res.status(400).json({ message: 'Attendance list is required and must be an array.' });
      }
  
      // Check if subjectCode, lecture, and attendanceDate are provided
      if (!subjectCode || !lecture || !attendanceDate) {
        return res.status(400).json({ message: 'Subject code, lecture, and attendance date are required.' });
      }
  
      // Call service to upload attendance
      const uploadResult = await uploadAttendance(subjectCode, lecture, attendanceDate, attendanceList);
  
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
  
  // GET to retrieve uploaded attendance by subjectCode, date, and lecture
exports.getUploadedAttendance = async (req, res) => {
  try {
    const { subjectCode, date, lecture } = req.query;
  
    // Call service to get attendance data
    const attendanceData = await getUploadedAttendance(subjectCode, date, lecture);
  
    res.status(200).json(attendanceData);
  } catch (error) {
    console.error('Error fetching uploaded attendance:', error);
    res.status(500).json({ message: 'Error fetching uploaded attendance' });
  }
};