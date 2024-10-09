import { useState, useEffect, useRef } from 'react';
import { Link as ScrollLink } from 'react-scroll'; // For smooth scrolling
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'; // For routing
import './Navbar.css'; // Import the CSS file
import profile from '/src/assets/AdminHeader/profileadmin.jpg';
import account from '/src/assets/Navbar_icon/admin-panel.png';
import contact from '/src/assets/Navbar_icon/contact.png';
import home from '/src/assets/Navbar_icon/home-page-white-icon.webp';
import info from '/src/assets/Navbar_icon/informationicon.webp';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation(); // Get the current path
  const [showLogout, setShowLogout] = useState(false); // State to show/hide logout button
  const [showLinks, setShowLinks] = useState(false); // State to show/hide the nav links in mobile view
  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility
  const [userName, setUserName] = useState('User'); // Initially set the username to "User"
  const navigate = useNavigate(); // For navigation after logout
  const dropdownRef = useRef(null); // Ref for the dropdown
  const isHomePage = location.pathname === '/';

  const toggleLogout = () => {
    setShowLogout((prevShowLogout) => !prevShowLogout);
  };

  const toggleLinks = () => {
    setShowLinks((prevShowLinks) => !prevShowLinks);
  };

  const toggleDropdown = () => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);  // Ensure isLoggedIn is updated
    setUserName('User'); // Reset username to 'User' on logout
    if (!isHomePage) {
      navigate('/login');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    setShowDropdown(false); // Hide dropdown on page load or navigation
  }, [location, setIsLoggedIn]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false); // Close the dropdown if clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className='snav'>
      <ul className={`sul ${showLinks ? 'show-links' : ''}`}>
        <li className="snavlogo sli">XYZ UNIVERSITY</li>

        {isHomePage && (
          <li className="sli">
            <RouterLink to="/admin/admin-login" className="snav-link">
              <img 
                src={account}
                alt="Admin Login Icon" 
                className="icon" 
              />
              Admin Login
            </RouterLink>
          </li>
        )}

        <li className='sli'>
          {isHomePage ? (
            <ScrollLink to="top" smooth={true} duration={500} className="snav-link">
              <img 
                src={home} 
                alt="Home Icon" 
                className="icon1" 
              />
              Home
            </ScrollLink>
          ) : (
            <RouterLink to="/" className="snav-link">
              <img 
                src={home}
                alt="Home Icon" 
                className="icon1" 
              />
              Home
            </RouterLink>
          )}
        </li>

        <li className='sli'>
          {isHomePage ? (
            <ScrollLink to="about-us" smooth={true} duration={500} className="snav-link">
              <img 
                src={info} 
                alt="About Us Icon" 
                className="icon1" 
              />
              About Us
            </ScrollLink>
          ) : (
            <RouterLink to="/about-us" className="snav-link">
              <img 
                src={info} 
                alt="About Us Icon" 
                className="icon1" 
              />
              About Us
            </RouterLink>
          )}
        </li>

        <li className='sli'>
          {isHomePage ? (
            <ScrollLink to="contact" smooth={true} duration={500} className="snav-link">
              <img 
                src={contact}
                alt="Contact Icon" 
                className="icon2" 
              />
              Contact
            </ScrollLink>
          ) : (
            <RouterLink to="/contact" className="snav-link">
              <img 
                src={contact} 
                alt="Contact Icon" 
                className="icon2" 
              />
              Contact
            </RouterLink>
          )}
        </li>

        <li className="snavprofile-container sli" onClick={toggleDropdown} ref={dropdownRef}>
          <img
            src={profile}
            alt="Profile"
            className="snavprofile-img"
          />
          {showDropdown && (
            <div className="dropdown-menu">
              <p className="username">Hello, {userName}!</p>
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
