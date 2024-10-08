import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherAttendance.css';
import axios from 'axios';
import AttendanceTable from './AttendanceTable';

const TeacherAttendance = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState('');
  const [date, setDate] = useState('');
  const [lecture, setLecture] = useState('');
  const [subjectList, setSubjectList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [attendanceList, setAttendanceList] = useState([]);

  const token = localStorage.getItem('token');

  // Fetch subjects on mount
  useEffect(() => {
    if (token) {
      const fetchSubjects = async () => {
        try {
          const subjectResponse = await axios.get('http://localhost:3000/api/teachers/subjects', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          setSubjectList(subjectResponse.data);
        } catch (error) {
          console.error('Error fetching subjects:', error);
        }
      };
      fetchSubjects();
    }
  }, [token]);

  // Fetch students when a subject is selected
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
      setStudentList(studentResponse.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Handle attendance marking
  const handleAttendanceChange = (enrollmentNo, attendance) => {
    setAttendanceList((prev) =>
      prev.some((item) => item.enrollmentNo === enrollmentNo)
        ? prev.map((item) =>
            item.enrollmentNo === enrollmentNo ? { ...item, attendance } : item
          )
        : [...prev, { enrollmentNo, attendance }]
    );
  };

  // Handle lecture change
  const handleLectureChange = (e) => {
    const value = e.target.value;
    if (value >= 0 || value === '') {
      setLecture(value);
    }
  };

  // Handle attendance submission on Save button click
  const handleAttendanceSubmit = async () => {
    if (!selectedSubject || !date || !lecture || attendanceList.length === 0) {
      alert('Please fill in all fields and mark attendance.');
      return;
    }

    const attendanceData = {
      subjectCode: selectedSubject,
      lecture: Number(lecture),
      attendanceDate: date,
      attendanceList,
    };

    try {
      const response = await axios.post('http://localhost:3000/api/attendance/upload', attendanceData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('API Response:', response.data);  // Log the API response
      alert('Attendance uploaded successfully!');
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Error uploading attendance:', error.response.data);
        alert(`Failed to upload attendance: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        // Request was made but no response was received
        console.error('No response received from the server:', error.request);
        alert('Failed to upload attendance: No response from server');
      } else {
        // Something else went wrong
        console.error('Error in uploading attendance:', error.message);
        alert(`Failed to upload attendance: ${error.message}`);
      }
    }
  };    
  return (
    <div className="teacher-attendance-container">
      {/* Subject Dropdown */}
      <div className="teacher-subject-dropdown">
        <select
          className="portalselect"
          value={selectedSubject}
          onChange={(e) => handleSubjectChange(e.target.value)}
        >
          <option value="">Subject</option>
          {subjectList.map((subject, index) => (
            <option key={index} value={subject.subject_code}>
              {`${subject.sub_initials} (${subject.subject_code})`}
            </option>
          ))}
        </select>
      </div>

      <div className="teacher-attendance-details">
        <div className="teacher-input-row">
          <label htmlFor="date">Date: </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
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

        {/* Pass attendance props and the submit handler */}
        <AttendanceTable
          students={studentList}
          onAttendanceChange={handleAttendanceChange}
          onSave={handleAttendanceSubmit}
        />
      </div>
    </div>
  );
};

export default TeacherAttendance;
