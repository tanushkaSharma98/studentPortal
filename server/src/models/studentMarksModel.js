const sequelize = require('../config/dbConfig');  

exports.getMarks = async (userId, subjectId, examId) => {
    try {
        console.log('Executing query to fetch student marks...');
        const results = await sequelize.query(`
            SELECT 
                m.marks_obtained,
                m.percentage,
                s.subject_name,
                s.subject_code,
                e.exam_name,
                e.maximum_marks
            FROM 
                marks m
            JOIN 
                subject s ON m.subject_id = s.subject_id
            JOIN 
                exam_type e ON m.exam_id = e.exam_id
            WHERE 
                m.student_id = (SELECT student_id FROM student WHERE user_id = :userId)
            AND 
                m.subject_id = :subjectId
            AND
                m.exam_id = :examId
        `, {
            replacements: { userId, subjectId, examId },
            type: sequelize.QueryTypes.SELECT  // Ensure QueryTypes is used correctly
        });

        return results;
    } catch (error) {
        throw new Error('Error fetching student marks: ' + error.message);
    }
};
