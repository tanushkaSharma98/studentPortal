const { getSubjects} = require('../models/subjectModel'); // Import the Subject model directly

exports.getSubjects = async (filters) => {
    try {
      // Fetch subjects from the database
      const subjects = await getSubjects(filters);
        return subjects;
    } catch (error) {
        console.error('Error in fetchSubjects service:', error);
        throw new Error('Unable to retrieve subject details from database');
    }
  };