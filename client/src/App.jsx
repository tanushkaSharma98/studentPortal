import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Common/navbar/Navbar.jsx';
import Index from './components/Homepage/index.jsx';
import AboutUs from './components/Homepage/about-us/AboutUs.jsx';
import Contact from './components/Homepage/contact-us/Contact.jsx';
import Login from './components/Authentication/Login.jsx';
import StudentDashboard from './components/Student/StudentDashboard/StudentDashboard.jsx';
import DailyAttendance from './components/Student/DailyAttendance/DailyAtt.jsx';
import TeacherDashboard from './components/Teacher/TeacherDashboard/TeacherDashboard.jsx';
import DailyAttendanceRecord from './components/Teacher/DailyAttendanceRecord/DailyAttendanceRecord.jsx';
import ProtectedRoute from './components/Common/ProtectedRoute.jsx'; // Import the ProtectedRoute

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]);

  return (
    <div>
      {!isAdminRoute && (
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
      <div style={{ paddingTop: isAdminRoute ? '0' : '60px' }}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Protecting student and teacher routes */}
          <Route path="/student-dashboard" element={<ProtectedRoute element={<StudentDashboard />} />} />
          <Route path="/daily-attendance" element={<ProtectedRoute element={<DailyAttendance />} />} />
          <Route path="/teacher-dashboard" element={<ProtectedRoute element={<TeacherDashboard />} />} />
          <Route path="/daily-attendance-record" element={<ProtectedRoute element={<DailyAttendanceRecord />} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
