// import { useState, useEffect } from 'react';
// import './StudentRecord.css';
// import StudentRecordTable from './StudentRecordTable';

// const StudentRecord = () => {
//   const [subjectDropdown, setSubjectDropdown] = useState(false);
//   const [marksBelowDropdown, setMarksBelowDropdown] = useState(false);
//   const [selectedSubject, setSelectedSubject] = useState('Subject');
//   const [selectedMarksBelow, setSelectedMarksBelow] = useState('Marks Below');
//   const [threshold, setThreshold] = useState(null); // State for the threshold value
//   const [students, setStudents] = useState([]); // State for storing fetched student records
//   const [loading, setLoading] = useState(false); // State to manage loading

//   const toggleSubjectDropdown = () => setSubjectDropdown(!subjectDropdown);
//   const toggleMarksBelowDropdown = () => setMarksBelowDropdown(!marksBelowDropdown);

//   const handleSubjectSelect = (subject) => {
//     setSelectedSubject(subject);
//     setSubjectDropdown(false);
//   };

//   const handleMarksBelowSelect = (marks) => {
//     setSelectedMarksBelow(marks);
//     setMarksBelowDropdown(false);

//     // Set the threshold value based on the selected option
//     if (marks === 'Below 10') {
//       setThreshold(10);
//     } else if (marks === 'Below 20') {
//       setThreshold(20);
//     } else {
//       setThreshold(null); // Reset if none match
//     }
//   };

//   const subjects = ['Maths', 'Physics', 'Chemistry'];
//   const marksBelowOptions = ['Below 10', 'Below 20'];

//   // Fetch students based on selected subject and threshold
//   useEffect(() => {
//     const fetchStudents = async () => {
//       if (selectedSubject !== 'Subject' && threshold !== null) {
//         setLoading(true);
//         try {
//           const response = await fetch(`http://localhost:3000/api/marks/below-threshold?subjectId=${selectedSubject}&threshold=${threshold}`);
//           const data = await response.json();
//           if (data.success) {
//             setStudents(data.data); // Assuming the API returns a data array with student records
//           } else {
//             console.error(data.message);
//             setStudents([]); // Clear students on error
//           }
//         } catch (error) {
//           console.error('Error fetching student records:', error);
//           setStudents([]);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchStudents();
//   }, [selectedSubject, threshold]);

//   return (
//     <div className="teacher-attendanceContainer">
//       <div className="teacher-topButtons">
//         {/* Subject Dropdown */}
//         <div className="teacher-Dropdown">
//           <button className="teacher-DropdownBtn" onClick={toggleSubjectDropdown}>
//             {selectedSubject} <span className="teacher-arrow">&#x25BC;</span>
//           </button>
//           {subjectDropdown && (
//             <div className="teacher-DropdownContent">
//               {subjects.map((subject, index) => (
//                 <a href="#" key={index} onClick={(e) => { e.preventDefault(); handleSubjectSelect(subject); }}>
//                   {subject}
//                 </a>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Marks Below Dropdown */}
//         <div className="teacher-Dropdown" style={{ marginLeft: 'auto' }}>
//           <button className="teacher-DropdownBtn" onClick={toggleMarksBelowDropdown}>
//             {selectedMarksBelow} <span className="arrow">&#x25BC;</span>
//           </button>
//           {marksBelowDropdown && (
//             <div className="teacher-DropdownContent">
//               {marksBelowOptions.map((marks, index) => (
//                 <a href="#" key={index} onClick={(e) => { e.preventDefault(); handleMarksBelowSelect(marks); }}>
//                   {marks}
//                 </a>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Record details below buttons */}
//       <div className="teacher-RecordDetails">
//         <span className="teacher-UpdatedLast">Updated Last: Yesterday</span>
//         <span className="teacher-TotalLecture">Total Lecture: 10</span>
//       </div>

//       {/* Loading Indicator */}
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div>
//           <StudentRecordTable students={students} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentRecord;


import { useState } from 'react';
import './StudentRecord.css';
import StudentRecordTable from './StudentRecordTable';

const StudentRecord = () => {
  const [subjectDropdown, setSubjectDropdown] = useState(false);
  const [marksBelowDropdown, setMarksBelowDropdown] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('Subject');
  const [selectedMarksBelow, setSelectedMarksBelow] = useState('Marks Below');
  const [threshold, setThreshold] = useState(null); // Correctly define threshold and setThreshold
  const [students, setStudents] = useState([]); // State for storing fetched student records
  const [loading, setLoading] = useState(false); // State to manage loading

  const toggleSubjectDropdown = () => setSubjectDropdown(!subjectDropdown);
  const toggleMarksBelowDropdown = () => setMarksBelowDropdown(!marksBelowDropdown);

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setSubjectDropdown(false);
  };

  const handleMarksBelowSelect = (marks) => {
    setSelectedMarksBelow(marks);
    
    // Set the threshold value based on the selected option
    if (marks === 'Below 10') {
      setThreshold(10);
    } else if (marks === 'Below 20') {
      setThreshold(20);
    } else {
      setThreshold(null); // Reset if none match
    }

    // Fetch students when a marks threshold is selected
    fetchStudents(marks === 'Below 10' ? 10 : marks === 'Below 20' ? 20 : null);

    // Close the dropdown after selection
    setMarksBelowDropdown(false);
  };

  const subjects = ['Maths', 'Physics', 'Chemistry'];
  const marksBelowOptions = ['Below 10', 'Below 20'];

  // Function to fetch students based on selected subject and threshold
  const fetchStudents = async (thresholdValue) => {
    if (selectedSubject !== 'Subject' && thresholdValue !== null) {
      setLoading(true);
      try {
        const subjectId = subjects.indexOf(selectedSubject) + 1; // Assuming subject IDs are 1-based
        const response = await fetch(`http://localhost:3000/api/marks/below-threshold?subjectId=${subjectId}&threshold=${thresholdValue}`);
        const data = await response.json();
        if (data.success) {
          setStudents(data.data); // Assuming the API returns a data array with student records
        } else {
          console.error(data.message);
          setStudents([]); // Clear students on error
        }
      } catch (error) {
        console.error('Error fetching student records:', error);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    }
  };

//   return (
//     <div className="teacher-attendanceContainer">
//       <div className="teacher-topButtons">
//         {/* Subject Dropdown */}
//         <div className="teacher-Dropdown">
//           <button className="teacher-DropdownBtn" onClick={toggleSubjectDropdown}>
//             {selectedSubject} <span className="teacher-arrow">&#x25BC;</span>
//           </button>
//           {subjectDropdown && (
//             <div className="teacher-DropdownContent">
//               {subjects.map((subject, index) => (
//                 <a href="#" key={index} onClick={(e) => { e.preventDefault(); handleSubjectSelect(subject); }}>
//                   {subject}
//                 </a>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Marks Below Dropdown */}
//         <div className="teacher-Dropdown" style={{ marginLeft: 'auto' }}>
//         <div>Threshold Value: {threshold}</div> {/* Example usage */}
//           <button className="teacher-DropdownBtn" onClick={toggleMarksBelowDropdown}>
//             {selectedMarksBelow} <span className="arrow">&#x25BC;</span>
//           </button>
//           {marksBelowDropdown && (
//             <div className="teacher-DropdownContent">
//               {marksBelowOptions.map((marks, index) => (
//                 <a href="#" key={index} onClick={(e) => { e.preventDefault(); handleMarksBelowSelect(marks); }}>
//                   {marks}
//                 </a>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Record details below buttons */}
//       <div className="teacher-RecordDetails">
//         <span className="teacher-UpdatedLast">Updated Last: Yesterday</span>
//         <span className="teacher-TotalLecture">Total Lecture: 10</span>
//       </div>

//       {/* Loading Indicator */}
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div>
//           <StudentRecordTable students={students} />
//         </div>
//       )}
//     </div>
//   );

return (
  
    <div className="teacher-attendanceContainer">
      <div className="teacher-topButtons">
        
        {/* Subject Dropdown */}
        <div className="teacher-Dropdown">
          <button className="teacher-DropdownBtn" onClick={toggleSubjectDropdown}>
            {selectedSubject}
            <span className="teacher-arrow"></span> {/* CSS-generated arrow */}
          </button>
          {subjectDropdown && (
            <div className="teacher-DropdownContent">
              {subjects.map((subject, index) => (
                <a href="#" key={index} onClick={(e) => { e.preventDefault(); handleSubjectSelect(subject); }}>
                  {subject}
                </a>
              ))}
            </div>
          )}
        </div>
  
        {/* Marks Below Dropdown */}
        <div className="teacher-Dropdown" style={{ marginLeft: 'auto' }}>
          <div>Threshold Value: {threshold}</div>
          <button className="teacher-DropdownBtn" onClick={toggleMarksBelowDropdown}>
            {selectedMarksBelow}
            <span className="teacher-arrow"></span> {/* CSS-generated arrow */}
          </button>
          {marksBelowDropdown && (
            <div className="teacher-DropdownContent">
              {marksBelowOptions.map((marks, index) => (
                <a href="#" key={index} onClick={(e) => { e.preventDefault(); handleMarksBelowSelect(marks); }}>
                  {marks}
                </a>
              ))}
            </div>
          )}
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
