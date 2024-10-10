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
  const [isUpdating, setIsUpdating] = useState(false);

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

    // Handle date change
    const handleDateChange = async (e) => {
      const selectedDate = e.target.value;
      setDate(selectedDate);
  
      if (selectedSubject && selectedDate && lecture) {
        try {
          // Fetch attendance data based on subject code and date
          const response = await axios.get(
            `http://localhost:3000/api/teachers/attendance/get?subjectCode=${selectedSubject}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          // If data exists, set it to the state and switch to update mode
          if (response.data.length > 0) {
            setAttendanceList(response.data);
            setIsUpdating(true);
            alert('Attendance data fetched for the selected date and subject.');
          } else {
            // Clear attendanceList if no data is found for the selected date and subject
            setAttendanceList([]);
            setIsUpdating(false); // Reset update mode since there's no existing data
          }
        } catch (error) {
          console.error('Error fetching attendance data:', error);
          alert('Error fetching attendance data.');
        }
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
    const response = await axios.post(
      'http://localhost:3000/api/teachers/attendance/upload',
      attendanceData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('API Response:', response.data);
    alert('Attendance uploaded successfully!');

    // Reset attendance list, date, lecture, and trigger reset in the table
    setAttendanceList([]); // Completely reset the attendance list
    setDate(''); // Clear the date field
    setLecture(''); // Clear the lecture field
    setIsUpdating(false); // Exit update mode if applicable
    navigate('/teacher-dashboard'); // You can navigate as intended
  } catch (error) {
    if (error.response) {
      console.error('Error uploading attendance:', error.response.data);
      alert(`Failed to upload attendance: ${error.response.data.message || 'Unknown error'}`);
    } else if (error.request) {
      console.error('No response received from the server:', error.request);
      alert('Failed to upload attendance: No response from server');
    } else {
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

