import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll'; // For smooth scrolling
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'; // For routing
import './Navbar.css'; // Import the CSS file

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {  // Receive props
  const location = useLocation(); // Get the current path
  const [showLogout, setShowLogout] = useState(false); // State to show/hide logout button
  const navigate = useNavigate(); // For navigation after logout

  const isHomePage = location.pathname === '/';

  const toggleLogout = () => {
    setShowLogout((prevShowLogout) => !prevShowLogout);
  };

  const handleLogout = () => {
    // Remove the token from local storage and update state
    localStorage.removeItem('token');
    setIsLoggedIn(false);  // Ensure isLoggedIn is updated

    if (!isHomePage) {
      navigate('/login');
    }
  };

  // Reset showLogout state when the component mounts or location changes
  useEffect(() => {
    setShowLogout(false); // Hide logout button on page load or navigation
  }, [location]);

  return (
    <nav className='snav'>
      <ul className='sul'>
        <li className="snavlogo sli">XYZ UNIVERSITY</li>
        
        {isHomePage && (
          <li className="sli">
            <RouterLink to="/admin/admin-login" className="snav-link">
              Admin Login
            </RouterLink>
          </li>
        )}

        <li className='sli'>
          {isHomePage ? (
            <ScrollLink to="top" smooth={true} duration={500} className="snav-link">
              <img 
                src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/home-page-white-icon.png" 
                alt="Home Icon" 
                className="icon" 
              />
              Home
            </ScrollLink>
          ) : (
            <RouterLink to="/" className="snav-link">
              <img 
                src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/home-page-white-icon.png" 
                alt="Home Icon" 
                className="icon" 
              />
              Home
            </RouterLink>
          )}
        </li>

        <li className='sli'>
          {isHomePage ? (
            <ScrollLink to="about-us" smooth={true} duration={500} className="snav-link">
              <img 
                src="https://uxwing.com/wp-content/themes/uxwing/download/signs-and-symbols/round-information-white-icon.png" 
                alt="About Us Icon" 
                className="icon" 
              />
              About Us
            </ScrollLink>
          ) : (
            <RouterLink to="/about-us" className="snav-link">
              <img 
                src="https://uxwing.com/wp-content/themes/uxwing/download/signs-and-symbols/round-information-white-icon.png" 
                alt="About Us Icon" 
                className="icon" 
              />
              About Us
            </RouterLink>
          )}
        </li>

        <li className='sli'>
          {isHomePage ? (
            <ScrollLink to="contact" smooth={true} duration={500} className="snav-link">
              <img 
                src="https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/phone-ringing-white-icon.png" 
                alt="Contact Icon" 
                className="icon" 
              />
              Contact
            </ScrollLink>
          ) : (
            <RouterLink to="/contact" className="snav-link">
              <img 
                src="https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/phone-ringing-white-icon.png" 
                alt="Contact Icon" 
                className="icon" 
              />
              Contact
            </RouterLink>
          )}
        </li>

        <li className="snavprofile-container sli" onClick={toggleLogout}>
          <img
            src="https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35717211-stock-illustration-vector-user-icon.jpg"
            alt="Profile"
            className="snavprofile-img"
          />
          {isLoggedIn && showLogout && (
            <button onClick={handleLogout} className="snavbutton slogout-button">
              Logout
            </button>
          )}
          {!isLoggedIn && showLogout && (
            <RouterLink to="/login" className="snavbutton slogin-button">
              Login
            </RouterLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
