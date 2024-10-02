const db = require('../config/dbConfig');

const getBranchSemSubDetails = async (subject_code) => {
    const query = `
        SELECT 
            b.branch_name,
            bss.semester
        FROM 
            branch_sem_sub bss
        INNER JOIN 
            branch b ON b.branch_id = bss.branch_id
        INNER JOIN 
            subject s ON s.subject_id = bss.subject_id
        WHERE 
            s.subject_code = :subject_code
    `;

    return await db.query(query, {
        replacements: { subject_code },
        type: db.QueryTypes.SELECT,
    });
};

module.exports = {
    getBranchSemSubDetails,
};
