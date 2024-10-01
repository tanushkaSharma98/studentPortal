const sequelize = require('../config/dbConfig');
const { secretKey } = require('../config/config.js'); // Assuming JWT_SECRET is in config.js

// Get branch_id by branch_name
exports.getBranchIdByName = async (branchName) => {
  try {
    const query = 'SELECT branch_id FROM branch WHERE branch_name = :branchName';
    const result = await sequelize.query(query, {
      replacements: { branchName },
      type: sequelize.QueryTypes.SELECT
    });
    return result.length > 0 ? result[0].branch_id : null;
  } catch (error) {
    console.error('Error getting branch_id by name:', error);
    throw new Error('Error fetching branch_id');
  }
};

// Create a new user in the users table with user_type set to 1 (Student)
exports.createUser = async (userData) => {
  const { email, password } = userData;
  const userType = 1;  // Set user_type to 1 (for student)

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

// Create a new student in the student table
exports.createStudent = async (studentData) => {
  const { student_name, enrollment_no, user_id, branch_id, semester, contact_no } = studentData;

  try {
    const studentQuery = `
      INSERT INTO student (student_name, enrollment_no, user_id, branch_id, semester, contact_no)
      VALUES (:student_name, :enrollment_no, :user_id, :branch_id, :semester, :contact_no)
      RETURNING *;
    `;
    const studentResult = await sequelize.query(studentQuery, {
      replacements: { student_name, enrollment_no, user_id, branch_id, semester, contact_no },
      type: sequelize.QueryTypes.INSERT
    });

    return studentResult[0][0]; // Returning the inserted student record
  } catch (error) {
    console.error('Error creating student:', error);
    throw new Error('Error creating student');
  }
};
