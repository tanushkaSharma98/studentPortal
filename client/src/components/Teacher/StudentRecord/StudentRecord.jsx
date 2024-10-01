import { useState, useEffect } from 'react';
import './StudentRecord.css';
import StudentRecordTable from './StudentRecordTable';

const StudentRecord = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedMarksBelow, setSelectedMarksBelow] = useState('');
  const [subjects, setSubjects] = useState(['Maths', 'Physics', 'Chemistry']);
  const [students, setStudents] = useState([]); // State for storing fetched student records
  const [loading, setLoading] = useState(false); // State to manage loading

  useEffect(() => {
    // You can add logic here to fetch subjects from the server if needed
  }, []);

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    // You can add logic here to filter students by the selected subject
  };

  const handleMarksBelowChange = (e) => {
    setSelectedMarksBelow(e.target.value);

    // Set the threshold value based on the selected option
    const threshold = e.target.value === 'Below 10' ? 10 : e.target.value === 'Below 20' ? 20 : null;

    // Fetch students when a marks threshold is selected
    fetchStudents(threshold);
  };

  const fetchStudents = (threshold) => {
    setLoading(true);
    // Simulate a fetch call to get students based on the threshold
    setTimeout(() => {
      // Replace this with your actual API call
      setStudents([]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="teacher-attendanceContainer">
      <div className="teacher-TopButtons">
        {/* Subject Dropdown */}
        <div className="teacherSub-Dropdown">
          <select value={selectedSubject} onChange={handleSubjectChange}>
            <option value=""> Subject</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        {/* Marks Below Dropdown */}
        <div className="teacher-MarksDropdown">
          <select value={selectedMarksBelow} onChange={handleMarksBelowChange}>
            <option value="">Marks below</option>
            <option value="Below 10">Below 10</option>
            <option value="Below 20">Below 20</option>
          </select>
        </div>
      </div>

      {/* Record details below buttons */}
      <div className="teacher-RecordDetails">
        <span className="teacher-UpdatedLast">Updated Last: Yesterday</span>
        <span className="teacher-TotalLecture">Total Lecture: 10</span>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <StudentRecordTable students={students} />
        </div>
      )}
    </div>
  );
};

export default StudentRecord;
