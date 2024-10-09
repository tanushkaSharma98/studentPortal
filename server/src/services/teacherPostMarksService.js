const teacherPostMarksModel = require('../models/teacherPostMarksModel');

// Prepare marks data by fetching subject details
const prepareMarksData = async (subjectCode, examId, marks) => {
  try {
    // Log subjectCode to verify it's being passed correctly
    console.log('Preparing marks data for subjectCode:', subjectCode);

    // Fetch subject details using subjectCode
    const subjectDetails = await teacherPostMarksModel.getSubjectDetails(subjectCode);

    if (!subjectDetails) {
      throw new Error('Invalid subject code provided');
    }

    // Process marks data
    return marks.map(mark => ({
      student_id: mark.student_id, // Make sure this matches your request body
      subject_id: subjectDetails.subject_id,
      exam_id: examId, // Include examId
      marks_obtained: mark.marks_obtained,
    }));
  } catch (error) {
    console.error('Error preparing marks data:', error);
    throw error;
  }
};


// Save marks into the database
const saveMarks = async (marksData) => {
  try {
    // Check if marksData is provided
    if (!marksData || marksData.length === 0) {
      throw new Error('No marks data provided to save');
    }
    
    await teacherPostMarksModel.insertMarks(marksData);
    console.log('Marks saved successfully');
  } catch (error) {
    console.error('Error saving marks:', error.message);
    throw error; // Propagate error to the controller
  }
};

// Get marks for a specific subject
const getMarksForSubject = async (subjectCode) => {
  if (!subjectCode) {
    throw new Error('Subject code is required to fetch marks');
  }

  // Fetch marks data
  const marksData = await teacherPostMarksModel.getMarksBySubject(subjectCode);
  return marksData;
};

const getSubjectDetails = async (subjectCode) => {
  if (!subjectCode) {
    throw new Error('Subject code is required to fetch subject details');
  }

  return await teacherPostMarksModel.getSubjectDetails(subjectCode);
};

module.exports = {
  prepareMarksData,
  saveMarks,
  getMarksForSubject,
  getSubjectDetails
};
