import { useState, useEffect } from 'react';
import './TeacherScoreboard.css';
import axios from 'axios';
import StudentTable from './Table'; // Import StudentTable component

const TeacherScoreboard = () => {
  // const [subjectDropdown, setSubjectDropdown] = useState(false);
  const [examDropdown, setExamDropdown] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedExam, setSelectedExam] = useState('Exam');
  const [examList, setExamList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [studentList, setStudentList] = useState([]); // State for student list

  const token = localStorage.getItem('token');

  // Fetch subjects and exams
  useEffect(() => {
    if (token) {
      const fetchSubjectsAndExams = async () => {
        try {
          // Fetch subjects based on teacherId
          const subjectResponse = await axios.get('http://localhost:3000/api/teachers/subjects', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          setSubjectList(subjectResponse.data);

          // Fetch exams
          const examResponse = await axios.get('http://localhost:3000/api/admin/exams', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          setExamList(examResponse.data);
        } catch (error) {
          console.error('Error fetching subjects or exams:', error);
        }
      };

      fetchSubjectsAndExams();
    }
  }, [token]);


  const handleSubjectChange = async (subject) => {
    setSelectedSubject(subject);
    try {
      const studentResponse = await axios.get(
        `http://localhost:3000/api/teachers/subject-students?subjectCode=${subject}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudentList(studentResponse.data); // Update student list
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };



  // Handle exam selection
  const handleExamSelect = (exam) => {
    setSelectedExam(exam);
    setExamDropdown(false);
  };

  // Handle save button

  return (
    <div className="teacher-scoreboard-container">
      <div className="teacher-top-buttons">
        {/* Subject Dropdown */}
        <div className="teacher-subject-dropdown">
          <select
            className='portalselect'
            value={selectedSubject}
            onChange={(e) => handleSubjectChange(e.target.value)}
          >
            <option value="">Subject</option>
            {subjectList.length > 0 ? (
              subjectList.map((subject, index) => (
                <option 
                  key={index} 
                  value={subject.subject_code} // Use only subject_code for API call
                >
                  {`${subject.sub_initials} (${subject.subject_code})`} 
                </option>
              ))
            ) : (
              <option value="">No subjects available</option>
            )}
          </select>
        </div>

        {/* Exam Dropdown */}
        <div className="teacher-exam-dropdown">
          <select
            className='portalselect'
            value={selectedExam}
            onChange={(e) => handleExamSelect(e.target.value)}
          >
            <option value="">Exam</option>
            {examList.length > 0 ? (
              examList.map((exam, index) => (
                <option key={index} value={exam.exam_name}>
                  {exam.exam_name}
                </option>
              ))
            ) : (
              <option value="">No exams available</option>
            )}
          </select>
        </div>
      </div>

      {/* Branch, Semester, Subject, Exam in a single row */}
      <div className="teacher-info-row">
        <span>Branch: Computer Science</span>
        <span>Semester: 7</span>
        <span>Subject: {selectedSubject}</span>
        <span>Exam: {selectedExam}</span>
      </div>

      <div className="teacher-maxmarks">
        <span>Maximum marks: 30</span>
      </div>

      {/* Render StudentTable with the fetched student list */}
      {selectedSubject !== 'Subject' && (
        <StudentTable students= {studentList} /> // Pass the student list to StudentTable
      )}
    </div>
  );
};

export default TeacherScoreboard;
