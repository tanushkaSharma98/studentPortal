// module.exports = { getExamNames };

const sequelize = require('../config/dbConfig'); // Import the sequelize instance

// Method to fetch exam names using raw SQL
const getExamNames = async () => {
  try {
    const [results, metadata] = await sequelize.query('SELECT exam_name,maximum_marks FROM exam_type');
    console.log('Fetched exams:', results);
    return results; // Return the fetched exam names
  } catch (error) {
    console.error('Error fetching exam names:', error);
    throw error;
  }
};

module.exports = { getExamNames };