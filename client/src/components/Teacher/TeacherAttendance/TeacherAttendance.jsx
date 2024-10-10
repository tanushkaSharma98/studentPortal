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
  const [buttonText, setButtonText] = useState('Save');

  const token = localStorage.getItem('token');

  // Fetch subjects on mount
  useEffect(() => {
    if (token) {
      const fetchSubjects = async () => {
        try {
          const subjectResponse = await axios.get('http://localhost:3000/api/teachers/subjects', {
            headers: {
              'Authorization': `Bearer ${token}`,
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
    setAttendanceList([]); // Clear attendance if subject changes
    setDate(''); // Reset date
    setLecture(''); // Reset lecture

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

  // Fetch attendance only when all fields are filled
  useEffect(() => {
    const fetchAttendance = async () => {
      if (selectedSubject && date && lecture) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/teachers/attendance/get?subjectCode=${selectedSubject}&date=${date}&lecture=${lecture}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.length > 0) {
            const updatedStudents = studentList.map((student) => {
              const attendanceData = response.data.find((attendance) => attendance.enrollment_no === student.enrollment_no);
              return {
                ...student,
                status: attendanceData ? (attendanceData.attendance ? 'Present' : 'Absent') : '',
                percentage: attendanceData ? attendanceData.percentage : 'N/A',
              };
            });

            setStudentList(updatedStudents); // Update student list with attendance data
            setAttendanceList(response.data); // Prefill attendance data
            setIsUpdating(true); // Set to update mode
            setButtonText('Edit'); // Change button text to 'Edit'
            alert('Attendance data fetched for the selected date and lecture.');
          } else {
            setAttendanceList([]); // No data means fresh attendance
            setIsUpdating(false); // Not in update mode
            setButtonText('Save'); // Reset button text to 'Save'
          }
        } catch (error) {
          console.error('Error fetching attendance data:', error);
          alert('Error fetching attendance data.');
        }
      }
    };

    fetchAttendance();
  }, [selectedSubject, date, lecture, token]); // Remove studentList from dependencies

  // Handle attendance submission on Save/Edit button click
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
      alert(isUpdating ? 'Attendance updated successfully!' : 'Attendance uploaded successfully!');

      // Reset attendance list, date, lecture, and trigger reset in the table
      setAttendanceList([]); // Completely reset the attendance list
      setDate(''); // Clear the date field
      setLecture(''); // Clear the lecture field
      setIsUpdating(false); // Exit update mode if applicable
      setButtonText('Save'); // Reset button text
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
            onChange={(e) => setLecture(e.target.value)}
            placeholder="Enter lecture number"
            min="0"
          />
        </div>

        {/* Pass attendance props and the submit handler */}
        <AttendanceTable
          students={studentList}
          onSave={handleAttendanceSubmit}
          isUpdating={isUpdating} // Pass the update state
        />
      </div>
    </div>
  );
};

export default TeacherAttendance;
