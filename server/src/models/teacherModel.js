const sequelize = require('../config/dbConfig'); 

exports.getTeacherDetailsById = async (userId) => {
    const query = `
       SELECT 
                t.teacher_name,
                t.designation,
                t.contact_no,
                u.email,
                array_agg(s.subject_name) AS subjects
            FROM 
                teacher t
            INNER JOIN 
                users u ON t.user_id = u.user_id
            INNER JOIN 
                subject_teacher st ON t.teacher_id = st.teacher_id
            INNER JOIN 
                subject s ON st.subject_id = s.subject_id
            WHERE 
                t.user_id = :userId
            GROUP BY 
                t.teacher_name, t.designation, t.contact_no, u.email
    `;
    try {
        const result = await sequelize.query(query, {
            replacements: { userId }, // Using replacements to pass userId
            type: sequelize.QueryTypes.SELECT
        });
        return result[0]; // Return the first row, or null if not found
    } catch (error) {
        console.error('Error fetching teacher details:', error.message);
        throw error;
    }
};
