import React from 'react';
import './AboutUs.css'; // Custom CSS for About Us

const AboutUs = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About XYZ University</h1>
      <p className="about-description">
        Welcome to XYZ University! Established with a mission to educate and inspire future leaders, our university is home to a vibrant community of learners, researchers, and innovators. With state-of-the-art facilities and a diverse range of programs, we are dedicated to fostering academic excellence and personal growth.
      </p>
      <p className="about-description">
        Our faculty consists of renowned educators and industry professionals who bring real-world experience into the classroom. At XYZ University, we are committed to providing our students with the knowledge, skills, and opportunities they need to succeed in their chosen fields.
      </p>
      <p className="about-description">
        Join us on a journey of learning and discovery, and become a part of our dynamic and inclusive community.
      </p>
    </div>
  );
};

export default AboutUs;
