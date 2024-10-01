import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherAttendance.css';
import AttendanceTable from './AttendanceTable';

const TeacherAttendance = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedExam, setSelectedExam] = useState('');
  const [date, setDate] = useState('');
  const [lecture, setLecture] = useState('');

  const subjects = ['Maths', 'Physics', 'Chemistry'];
  const exams = ['Midterm', 'Final', 'Quiz']; // List of exam types

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleExamChange = (e) => {
    setSelectedExam(e.target.value);
  };

  const handleLectureChange = (e) => {
    const value = e.target.value;
    if (value >= 0 || value === '') {
      setLecture(value);
    }
  };

  const handleSave = () => {
    console.log('Data saved');
  };

  return (
    <div className="teacher-attendance-container">
      <div className="teacher-top-buttons">
        {/* Subject Dropdown */}
        <div className="teacher-subject-dropdown">
          <select value={selectedSubject} onChange={handleSubjectChange}>
            <option value=""> Subject</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        {/* Exam Dropdown */}
        <div className="teacher-exam-dropdown">
          <select value={selectedExam} onChange={handleExamChange}>
            <option value=""> Exam</option>
            {exams.map((exam, index) => (
              <option key={index} value={exam}>
                {exam}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="teacher-attendance-details">
        <p className="teacher-updated-last">Updated Last: Yesterday</p>

        <div className="teacher-input-row">
          <label htmlFor="date">Date: </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <span className="teacher-total-lecture">Total Lecture: 10</span>
        </div>

        <div className="teacher-input-row">
          <label htmlFor="lecture">Lecture: </label>
          <input
            type="number"
            id="lecture"
            value={lecture}
            onChange={handleLectureChange}
            placeholder="Enter lecture number"
            min="0"
          />
        </div>
        <AttendanceTable />
      </div>

      {/* Bottom Buttons */}
      <div className="teacher-bottom-buttons">
        <button className="teacher-daily-record-btn" onClick={() => navigate('/daily-attendance-record')}>
          Daily Attendance Record
        </button>
        <button className="teacher-save-btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default TeacherAttendance;
