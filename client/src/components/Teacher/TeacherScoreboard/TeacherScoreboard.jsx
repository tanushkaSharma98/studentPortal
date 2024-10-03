import { useState, useEffect } from 'react';
import './TeacherScoreboard.css';
import Table from './Table.jsx';
import axios from 'axios';

const TeacherScoreboard = () => {
  const [subjectDropdown, setSubjectDropdown] = useState(false);
  const [examDropdown, setExamDropdown] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('Subject');
  const [selectedExam, setSelectedExam] = useState('Exam');
  const [examList, setExamList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);

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

  // Handle subject selection
  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setSubjectDropdown(false);
  };

  // Handle exam selection
  const handleExamSelect = (exam) => {
    setSelectedExam(exam);
    setExamDropdown(false);
  };

  // Handle save button
  const handleSave = () => {
    console.log('Data saved');
  };

  return (
    <div className="teacher-scoreboard-container">
      <div className="teacher-top-buttons">
        {/* Subject Dropdown */}
        <div className="teacher-subject-dropdown">
          <select
          className='portalselect'
            value={selectedSubject}
            onChange={(e) => handleSubjectSelect(e.target.value)}
          >
            <option value="">Subject</option>
            {subjectList.length > 0 ? (
              subjectList.map((subject, index) => (
                <option 
                  key={index} 
                  value={`${subject.sub_initials}(${subject.subject_code})`} // Display initials and code
                >
                  {`${subject.sub_initials}(${subject.subject_code})`} {/* Show sub_initials(subject_code) */}
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

      <div>
        <Table />
      </div>

      {/* Save Button */}
      <div className="teacherScoreboard-save-button-container">
        <button className="teacher-save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default TeacherScoreboard;