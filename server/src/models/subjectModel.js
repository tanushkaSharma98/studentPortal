const sequelize = require('../config/dbConfig');  // Ensure the path to your dbConfig file is correct

const getSubjects = async (filters = {}) => {
    try {
        console.log('Executing query to fetch subjects...');

        // Base query
        let query = `
            SELECT 
                s.subject_name, 
                s.subject_code, 
                b.branch_name AS branch, 
                bs.semester, 
                t.teacher_name AS teacher, 
                s.is_active
            FROM 
                subject s
            JOIN 
                branch_sem_sub bs ON s.subject_id = bs.subject_id
            JOIN 
                branch b ON bs.branch_id = b.branch_id
            JOIN 
                subject_teacher st ON s.subject_id = st.subject_id
            JOIN 
                teacher t ON st.teacher_id = t.teacher_id
            WHERE 
                1=1
        `;

        // Dynamic conditions
        const replacements = [];
        if (filters.branch_name) {
            query += ' AND b.branch_name = ?';
            replacements.push(filters.branch_name);
        }
        if (filters.semester) {
            query += ' AND bs.semester = ?';
            replacements.push(filters.semester);
        }

        // Execute the raw SQL query
        const results = await sequelize.query(query, {
            replacements,
            type: sequelize.QueryTypes.SELECT
        });

        return results;
    } catch (error) {
        throw new Error('Error fetching subjects: ' + error.message);
    }
};

module.exports = {
    getSubjects
};
