const createTeacherService = require('../services/createTeacherService');

exports.createTeacher = async (req, res) => {
  try {
    const { name, email, password, designation, contactNo, subjects } = req.body;

    // Validate request data (you can add more validation as needed)
    if (!name || !email || !password || !designation || !contactNo || !Array.isArray(subjects)) {
      return res.status(400).json({ error: 'All fields are required and subjects must be an array' });
    }

    // Call service function to create the teacher
    const result = await createTeacherService.createTeacher( name, email, password, designation, contactNo, subjects );
    
    return res.status(201).json(result);  // Return success response
  } catch (error) {
    console.error('Error creating teacher:', error);
    res.status(500).json({ error: 'Failed to create teacher', details: error.message }); // Provide error details in the response
  }
};
