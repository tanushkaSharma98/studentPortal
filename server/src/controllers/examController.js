const { getExam, registerExam, changeExamStatus } = require('../services/examService');

exports.getExam = async (req, res) => {
        try {

            const exams = await getExam();
            // Return the data as a JSON response
            res.status(200).json(exams);
          } catch (error) {
            console.error('Error fetching exam data:', error.message);
            res.status(500).json({ error: error.message });
          }
};

exports.createExam = async (req, res) => {

    const { examName, maximumMarks } = req.body;

    try {
        // Check if the user is an admin (user_type 0 or 3)
        const userType = req.user.user_type;
        if (userType !== 0 && userType !== 3) {
            return res.status(403).json({ message: 'Access denied. Only admins can add new exam type.' });
        }

        // Call the service to create the subject
        const result = await registerExam( examName, maximumMarks );

        // Return success response
        return res.status(201).json({
            message: 'New exam type added successfully',
            data: result
        });
    } catch (error) {
        console.error('Error in controller:', error);
        return res.status(500).json({
            message: 'Failed to add new exam'
        });
    }
};

exports.updateExamIsActive = async (req, res) => {
    const { exam_id, is_active } = req.body;
  
    try {
      const userType = req.user.user_type;
      if (userType !== 0 && userType !== 3) {
        return res.status(403).json({ message: 'Access denied. Only admins can update exam status.' });
      }
  
      // Call the service to update the status
      const result = await changeExamStatus(exam_id, is_active);
  
      // Return success response
      return res.status(200).json({
        message: 'Exam status updated successfully',
        data: result
      });
    } catch (error) {
      console.error('Error in controller:', error);
      return res.status(500).json({
        message: 'Failed to update exam status'
      });
    }
  };