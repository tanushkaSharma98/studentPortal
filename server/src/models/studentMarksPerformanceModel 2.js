const sequelize = require('../config/dbConfig');  

exports.getMarksPerformance = async (userId) => {
    try {
        console.log('Executing query to fetch student marks...');
        
        // Fetch the student's marks
        const results = await sequelize.query(`
            SELECT 
                m.percentage,
                s.subject_name,
                e.exam_name,
                e.exam_id,
                e.maximum_marks
            FROM 
                marks m
            JOIN 
                subject s ON m.subject_id = s.subject_id
            JOIN 
                exam_type e ON m.exam_id = e.exam_id
            WHERE 
                m.student_id = (SELECT student_id FROM student WHERE user_id = :userId)
        `, {
            replacements: { userId: userId },
            type: sequelize.QueryTypes.SELECT
        });

        // If the student was not found or no marks are returned
        if (!results || results.length === 0) {
            throw new Error('Student not found or no marks available for this user.');
        }

        return results;
    } catch (error) {
        throw new Error('Error fetching student marks: ' + error.message);
    }
};
