// import React from 'react';
// import './AboutUs.css';
// const AboutUs = () => {
//   return (
//     <div className="about">
//       <h1>About Us</h1>
      
//     </div>
//   );
// };

// export default AboutUs;
import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about">
      <h1>About Us</h1>
      
      {/* Campus Section */}
      <div className="section">
        <div className="photo-space">Campus Photo</div>
        <div className="description">
          <h2>Campus</h2>
          <p>Our campus is located in a serene environment with state-of-the-art facilities designed to foster academic excellence.</p>
        </div>
      </div>

      {/* Chairman Section */}
      <div className="section">
        <div className="photo-space">Chairman Photo</div>
        <div className="description">
          <h2>Chairman</h2>
          <p>Our chairman, Mr. XYZ, is a visionary leader who has greatly contributed to the growth of our institution.</p>
        </div>
      </div>

      {/* Vice Chairman Section */}
      <div className="section">
        <div className="photo-space">Vice Chairman Photo</div>
        <div className="description">
          <h2>Vice Chairman</h2>
          <p>Mr. ABC, our vice chairman, ensures the institution stays on track with its mission and vision.</p>
        </div>
      </div>

      {/* Principal Section */}
      <div className="section">
        <div className="photo-space">Principal Photo</div>
        <div className="description">
          <h2>Principal</h2>
          <p>Our principal, Mrs. DEE, I am dyslexic.</p>
        </div>
      </div>

      {/* Vice Principal Section */}
      <div className="section">
        <div className="photo-space">Vice Principal Photo</div>
        <div className="description">
          <h2>Vice Principal</h2>
          <p>Mr. GHI, our vice principal, I a'int nobodies bitch.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
