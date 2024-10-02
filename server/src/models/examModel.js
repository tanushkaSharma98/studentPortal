const sequelize = require('../config/dbConfig');  // Ensure the path to your dbConfig file is correct

// Function to fetch exam details
exports.getExam = async () => {
    try {
        console.log('Executing query to fetch exam details...');

        // Base query to fetch exam details
        const query = `
            SELECT 
                exam_name, 
                maximum_marks,
                is_active
            FROM
                exam_type
        `;

        // Execute the raw SQL query
        const results = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });

        return results;  // Return the fetched exam details
    } catch (error) {
        console.error('Error fetching exam details: ', error);
        throw new Error('Error fetching exam details: ' + error.message);
    }
};

// Function to create a new exam
exports.createExam = async (examName, maximumMarks) => {
    try {
        // Define the raw SQL query
        const query = `
            INSERT INTO exam_type (exam_name, maximum_marks, is_active)
            VALUES (:examName, :maximumMarks, TRUE)
            RETURNING *;
        `;

        // Execute the query with replacements (named parameters)
        const [result] = await sequelize.query(query, {
            replacements: { examName, maximumMarks },
            type: sequelize.QueryTypes.INSERT
        });

        return result;  // Return the newly inserted exam details
    } catch (error) {
        console.error('Model Error: Failed to insert new exam type', error);
        throw new Error('Model Error: Failed to add new exam type');
    }
};

exports.updateExamStatus = async (exam_id, is_active) => {
    try {
      const query = `
        UPDATE exam_type
        SET is_active = :is_active
        WHERE exam_id = :exam_id
        RETURNING exam_id, exam_name, is_active;
      `;
      const result = await sequelize.query(query, {
        replacements: { exam_id, is_active },
        type: sequelize.QueryTypes.UPDATE
      });
  
      // Return the updated subject
      return result[0][0];  // The first row of the first result set
    } catch (error) {
      throw new Error('Error updating exam status: ' + error.message);
    }
  };