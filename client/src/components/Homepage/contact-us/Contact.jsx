import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <h1 className='contact-sh1'>Contact Us</h1>

      <div className="contact-info">
        <div className="info-item">
          <h3 className='sh3'>Address:</h3>
          <p className='sp'>XYZ University, 123 College Road, Jaipur, Rajasthan, 302001</p>
        </div>
        <div className="info-item">
          <h3 className='sh3'>Phone:</h3>
          <p className='sp'>+91 98765 43210</p>
        </div>
        <div className="info-item">
          <h3 className='sh3'>Email:</h3>
          <p className='sp'>contact@xyzuniversity.edu.in</p>
        </div>
      </div>

      <div className="map">
        <h2>Find Us Here:</h2>
        <div className="map-placeholder">[Google Map Placeholder]</div>
      </div>
    </div>
  );
};

export default Contact;
