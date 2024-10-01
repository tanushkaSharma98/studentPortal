const createTeacherModel = require('../models/createTeacherModel');

exports.createTeacher = async (teacherData) => {
  const { name, email, password, designation, contactNo, subjects } = teacherData;

  try {
    // Validate request data
    if (!name || !email || !password || !designation || !contactNo || !Array.isArray(subjects) || subjects.length === 0) {
      throw new Error('All fields are required, and subjects must be an array with at least one subject.');
    }

    // Create a new user with user_type 2 (for teacher)
    const userId = await createTeacherModel.createUser({ email, password });

    // Create a new teacher in the teacher table
    const teacherId = await createTeacherModel.createTeacher({
      name,
      designation,
      user_id: userId,
      contactNo
    });

    // Insert teacher and subject mappings in subject_teacher table
    for (const subjectNameWithCode of subjects) {
        const subjectId = await createTeacherModel.getSubjectIdByCode(subjectNameWithCode);
        if (subjectId) {
          console.log(`Assigning subject ID ${subjectId} to teacher ID ${teacherId}`);
          await createTeacherModel.assignSubjectToTeacher(teacherId, subjectId);
        } else {
          console.error(`Subject with name/code ${subjectNameWithCode} not found.`);
          throw new Error(`Subject with name/code ${subjectNameWithCode} not found.`);
        }
      }

    return { message: 'Teacher created successfully', teacherId };
  } catch (error) {
    console.error('Error creating teacher:', error); // Log the actual error
    throw new Error('Failed to create teacher: ' + error.message); // Include the specific error message
  }
};
