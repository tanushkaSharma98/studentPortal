const sequelize = require('../config/dbConfig'); 
const {secretKey} = require('../config/config.js');

exports.getTeacherCount= async () => {
    const result = await sequelize.query('SELECT COUNT(*) AS count FROM users WHERE user_type = 2 AND is_active = true;', {
      type: sequelize.QueryTypes.SELECT
    });
    return result[0].count;
};

exports.getAllTeachers = async () => {
  const query = `
    SELECT 
      t.teacher_name,
      u.email, 
      pgp_sym_decrypt(u.password::bytea, :secretKey) AS decrypted_password
    FROM teacher t
    JOIN users u ON t.user_id = u.user_id
  `;
  try {
    const result = await sequelize.query(query, {
      replacements: { secretKey },
      type: sequelize.QueryTypes.SELECT
    });
    return result;
  } catch (error) {
    throw new Error('Error fetching all teachers: ' + error.message);
  }
};

// Fetch teachers by branch and semester
exports.getTeachersByBranchAndSemester = async (branchName, semester) => {
  const query = `
    SELECT t.teacher_name, u.email, 
           pgp_sym_decrypt(u.password::bytea, :secretKey) AS decrypted_password
    FROM teacher t
    JOIN users u ON t.user_id = u.user_id
    WHERE t.teacher_id IN (
      SELECT st.teacher_id
      FROM subject_teacher st
      WHERE st.subject_id IN (
        SELECT bss.subject_id
        FROM branch_sem_sub bss
        WHERE bss.branch_id = (
          SELECT b.branch_id FROM branch b WHERE b.branch_name = :branchName
        ) AND bss.semester = :semester
      )
    )
  `;
  try {
    const result = await sequelize.query(query, {
      replacements: { secretKey, branchName, semester },
      type: sequelize.QueryTypes.SELECT
    });
    return result;
  } catch (error) {
    throw new Error('Error fetching teachers by branch and semester: ' + error.message);
  }
};

// Search teachers by name
exports.searchTeachersByName = async (name) => {
  const query = `
    SELECT t.teacher_name, u.email, 
           pgp_sym_decrypt(u.password::bytea, :secretKey) AS decrypted_password
    FROM teacher t
    JOIN users u ON t.user_id = u.user_id
    WHERE t.teacher_name ILIKE :name
  `;
  try {
    const result = await sequelize.query(query, {
      replacements: { secretKey, name: `%${name}%` },
      type: sequelize.QueryTypes.SELECT
    });
    return result;
  } catch (error) {
    throw new Error('Error searching teachers by name: ' + error.message);
  }
};