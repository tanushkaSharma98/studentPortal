import { useState, useEffect } from 'react';
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

  // Add a new state to manage the visibility of the links
  const [showLinks, setShowLinks] = useState(false); // State to show/hide the nav links in mobile view
  
  const navigate = useNavigate(); // For navigation after logout
  const isHomePage = location.pathname === '/';

  const toggleLogout = () => {
    setShowLogout((prevShowLogout) => !prevShowLogout);
  };

  // Function to toggle the visibility of the links
  const toggleLinks = () => {
    setShowLinks((prevShowLinks) => !prevShowLinks);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);  // Ensure isLoggedIn is updated
    if (!isHomePage) {
      navigate('/login');
    }
  };

  // Check token on component mount or location change to determine login status
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    setShowLogout(false); // Hide logout button on page load or navigation
  }, [location, setIsLoggedIn]);

  return (
    <nav className='snav'>
      {/* Add 'show-links' class based on the showLinks state */}
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

        {/* Attach the toggleLinks function to the profile image click event */}
        <li className="snavprofile-container sli" onClick={toggleLinks}>
          <img
            src={profile}
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
