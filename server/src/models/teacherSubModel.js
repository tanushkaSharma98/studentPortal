const sequelize = require('../config/dbConfig'); // Ensure the path to your dbConfig file is correct

const getSubjectsByTeacher = async (userId) => {
    try {
        // First, get the teacher_id using the user_id from the teacher table
        const teacherQuery = `
            SELECT teacher_id
            FROM teacher
            WHERE user_id = ?
        `;

        // Execute the query to get teacher_id
        const teacherResult = await sequelize.query(teacherQuery, {
            replacements: [userId],
            type: sequelize.QueryTypes.SELECT
        });

        // Check if teacher_id exists
        if (!teacherResult.length || !teacherResult[0].teacher_id) {
            throw new Error('Teacher not found for the given user ID');
        }

        const teacher_id = teacherResult[0].teacher_id;

        // Now, get the subjects taught by this teacher along with branch_name and semester
        const subjectQuery = `
            SELECT 
                s.subject_id, 
                s.subject_code, 
                s.subject_name, 
                s.sub_initials, 
                b.branch_name,
                bss.semester
            FROM subject_teacher st 
            JOIN subject s ON st.subject_id = s.subject_id 
            JOIN branch_sem_sub bss ON bss.subject_id = s.subject_id 
            JOIN branch b ON b.branch_id = bss.branch_id 
            WHERE st.teacher_id = ?
        `;

        // Execute the query to get subjects along with branch names and semesters
        const subjectResult = await sequelize.query(subjectQuery, {
            replacements: [teacher_id],
            type: sequelize.QueryTypes.SELECT
        });

        return subjectResult; // Return all rows from the query result (multiple subjects)
    } catch (error) {
        console.error('Model Error: Failed to fetch subjects by teacher', error);
        throw new Error('Model Error: Failed to fetch subjects');
    }
};

module.exports = { getSubjectsByTeacher };
