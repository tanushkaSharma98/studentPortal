const sequelize = require('../config/dbConfig');
const { secretKey } = require('../config/config.js'); // Assuming JWT_SECRET is in config.js

// Create a new user in the users table with encrypted password and user_type set to 2 (for teacher)
exports.createUser = async (userData) => {
  const { email, password } = userData;
  const userType = 2; // Set user_type to 2 (for teacher)

  if (!secretKey) {
    throw new Error('Secret key is not defined in the environment variables');
  }

  try {
    const userQuery = `
      INSERT INTO users (email, password, user_type)
      VALUES (:email, pgp_sym_encrypt(:password, :secretKey), :userType)
      RETURNING user_id;
    `;
    const userResult = await sequelize.query(userQuery, {
      replacements: { email, password, secretKey, userType },
      type: sequelize.QueryTypes.INSERT
    });

    return userResult[0][0].user_id;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Error creating user');
  }
};

// Create a new teacher in the teacher table and assign multiple subjects
exports.createTeacher = async (teacherData) => {
  const { name, email, password, designation, contactNo, subjects } = teacherData;

  try {
    // Create the user first to get user_id
    const userId = await exports.createUser({ email, password });
    
    // Insert the teacher record into the teacher table
    const teacherQuery = `
      INSERT INTO teacher (teacher_name, designation, user_id, contact_no)
      VALUES (:name, :designation, :userId, :contactNo)
      RETURNING teacher_id;
    `;
    
    const teacherResult = await sequelize.query(teacherQuery, {
      replacements: { name, designation, userId, contactNo },
      type: sequelize.QueryTypes.INSERT
    });

    const teacherId = teacherResult[0][0].teacher_id;

    // Assign subjects to the teacher
    if (subjects && subjects.length > 0) {
      for (const subjectNameWithCode of subjects) {
        const subjectId = await exports.getSubjectIdByCode(subjectNameWithCode);
        if (subjectId) {
          await exports.assignSubjectToTeacher(teacherId, subjectId);
        } else {
          console.error(`Subject with name/code ${subjectNameWithCode} not found.`);
        }
      }
    }

    return teacherId;
  } catch (error) {
    console.error('Error creating teacher:', error);
    throw new Error('Error creating teacher');
  }
};

// Get subject_id by subject_code
exports.getSubjectIdByCode = async (subjectNameWithCode) => {
  try {
    // Split the input to extract the subject code
    const subjectCode = subjectNameWithCode.match(/\(([^)]+)\)/); // Extract the code inside parentheses
    if (!subjectCode) {
      throw new Error('Invalid subject format');
    }
    const code = subjectCode[1]; // Get the extracted code

    const query = 'SELECT subject_id FROM subject WHERE subject_code = :subjectCode';
    const result = await sequelize.query(query, {
      replacements: { subjectCode: code },
      type: sequelize.QueryTypes.SELECT
    });

    return result.length > 0 ? result[0].subject_id : null;
  } catch (error) {
    console.error('Error getting subject_id by code:', error);
    throw new Error('Error fetching subject_id');
  }
};

// Assign a subject to a teacher in the subject_teacher table
exports.assignSubjectToTeacher = async (teacherId, subjectId) => {
  try {
    const query = `
      INSERT INTO subject_teacher (teacher_id, subject_id)
      VALUES (:teacherId, :subjectId);
    `;
    await sequelize.query(query, {
      replacements: { teacherId, subjectId },
      type: sequelize.QueryTypes.INSERT
    });
  } catch (error) {
    console.error('Error assigning subject to teacher:', error);
    throw new Error('Error assigning subject to teacher');
  }
};
