import { useState, useEffect, useRef } from 'react';
import { Link as ScrollLink } from 'react-scroll'; // For smooth scrolling
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'; // For routing
import './Navbar.css'; // Import the CSS file
import profile from '/src/assets/AdminHeader/profileadmin.jpg';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation(); // Get the current path
  const [showDropdown, setShowDropdown] = useState(false); // State to show/hide dropdown
  const [userName, setUserName] = useState('User'); // Initially set the username to "User"
  const navigate = useNavigate(); // For navigation after logout
  const dropdownRef = useRef(null); // Create a ref for the dropdown menu

  const isHomePage = location.pathname === '/';

  const toggleDropdown = () => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false); // Ensure isLoggedIn is updated
    setUserName('User'); // Reset username to 'User' on logout

    if (!isHomePage) {
      navigate('/login');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // Set to logged in if token exists
    } else {
      setIsLoggedIn(false); // Set to logged out if no token exists
    }

    setShowDropdown(false); // Hide dropdown on page load or navigation
  }, [location, setIsLoggedIn]);

  // Close the dropdown if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false); // Close the dropdown if clicking outside
      }
    };

    // Add event listener to document
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

        {/* Navigation Links */}
        <li className='sli'>
          {isHomePage ? (
            <ScrollLink to="top" smooth={true} duration={500} className="snav-link">
              <img src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/home-page-white-icon.png" alt="Home Icon" className="icon" />
              Home
            </ScrollLink>
          ) : (
            <RouterLink to="/" className="snav-link">
              <img src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/home-page-white-icon.png" alt="Home Icon" className="icon" />
              Home
            </RouterLink>
          )}
        </li>

        <li className='sli'>
          {isHomePage ? (
            <ScrollLink to="about-us" smooth={true} duration={500} className="snav-link">
              <img src="https://uxwing.com/wp-content/themes/uxwing/download/signs-and-symbols/round-information-white-icon.png" alt="About Us Icon" className="icon" />
              About Us
            </ScrollLink>
          ) : (
            <RouterLink to="/about-us" className="snav-link">
              <img src="https://uxwing.com/wp-content/themes/uxwing/download/signs-and-symbols/round-information-white-icon.png" alt="About Us Icon" className="icon" />
              About Us
            </RouterLink>
          )}
        </li>

        <li className='sli'>
          {isHomePage ? (
            <ScrollLink to="contact" smooth={true} duration={500} className="snav-link">
              <img src="https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/phone-ringing-white-icon.png" alt="Contact Icon" className="icon" />
              Contact
            </ScrollLink>
          ) : (
            <RouterLink to="/contact" className="snav-link">
              <img src="https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/phone-ringing-white-icon.png" alt="Contact Icon" className="icon" />
              Contact
            </RouterLink>
          )}
        </li>

        <li className="snavprofile-container sli" onClick={toggleDropdown} ref={dropdownRef}>
          <img src={profile} alt="Profile" className="snavprofile-img" />
          {showDropdown && (
            <div className="dropdown-menu">
              <p className="username">Hello, User!</p>
              {isLoggedIn ? (
                <button onClick={handleLogout} className="snavbutton slogout-button">
                  Logout
                </button>
              ) : (
                <RouterLink to="/login">
                  <button className="snavbutton slogin-button">Login</button>
                </RouterLink>
              )}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
