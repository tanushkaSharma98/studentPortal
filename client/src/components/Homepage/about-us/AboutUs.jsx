import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about">
      <h1 className='home-h1'>About Us</h1>

      {/* Campus Section */}
      <Section title="Campus" photoText="Campus Photo" description="Our campus is located in a serene environment with state-of-the-art facilities designed to foster academic excellence." />

      {/* Chairman Section */}
      <Section title="Chairman" photoText="Chairman Photo" description="Our chairman, Mr. XYZ, is a visionary leader who has greatly contributed to the growth of our institution." />

      {/* Vice Chairman Section */}
      <Section title="Vice Chairman" photoText="Vice Chairman Photo" description="Mr. ABC, our vice chairman, ensures the institution stays on track with its mission and vision." />

      {/* Principal Section */}
      <Section title="Principal" photoText="Principal Photo" description="Our principal, Mrs. DEE." />

      {/* Vice Principal Section */}
      <Section title="Vice Principal" photoText="Vice Principal Photo" description="Mr. GHI, our vice principal." />
    </div>
  );
};

// Reusable section component for cleaner code
const Section = ({ title, photoText, description }) => (
  <div className="section">
    <div className="photo-space">{photoText}</div>
    <div className="description">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  </div>
);

export default AboutUs;
