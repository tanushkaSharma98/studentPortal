const sequelize = require('../config/dbConfig'); 


exports.getTeacherDetailsById = async (userId) => {
    const query = `
        SELECT
            s.student_name,
            s.enrollment_no,
            s.contact_no,
            s.semester,
            b.branch_name
        FROM
            student s
        JOIN
            branch b ON s.branch_id = b.branch_id
        WHERE user_id = :userId
    `;
    try {
        const result = await sequelize.query(query, {
            replacements: { userId }, // Using replacements to pass userId
            type: sequelize.QueryTypes.SELECT
        });
        return result[0]; // Return the first row, or null if not found
    } catch (error) {
        console.error('Error fetching student details:', error.message);
        throw error; // Optionally throw the error to be handled in your service or controller
    }
}
