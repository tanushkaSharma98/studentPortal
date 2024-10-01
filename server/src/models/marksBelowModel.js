// marksModel.js

const db = require('../config/dbConfig');
const { QueryTypes } = require('sequelize');

// Fetch students with marks below a certain threshold for a specific subject
const getStudentsBelowThreshold = async (subjectId, threshold) => {
    const query = `
       SELECT  
           s.student_name, 
           s.enrollment_no, 
           m1.marks_obtained AS midterm_1_marks,
           m2.marks_obtained AS midterm_2_marks
       FROM 
           marks m1
       JOIN 
           marks m2 ON m1.student_id = m2.student_id 
                    AND m1.exam_id = 1 
                    AND m2.exam_id = 2
       JOIN 
           student s ON m1.student_id = s.student_id
       WHERE 
           (m1.marks_obtained < :threshold OR m2.marks_obtained < :threshold)
           AND m1.subject_id = :subjectId
           AND m2.subject_id = :subjectId;
    `;

    try {
        const result = await db.query(query, {
            replacements: { subjectId, threshold },  // Pass replacements for subjectId and threshold
            type: QueryTypes.SELECT  // Specify the query type as SELECT
        });
        return result;
    } catch (error) {
        console.error("Error fetching students below threshold:", error);
        throw error;
    }
};

module.exports = {
    getStudentsBelowThreshold,
};
