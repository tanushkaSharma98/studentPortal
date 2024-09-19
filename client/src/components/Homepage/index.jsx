// import React from 'react';
// import './index.css';

// const Index = () => {
//   return (
//     <>
//     <div className="centered-container">
//       <div>
//         <h1 className="large-text">Welcome to </h1>
//         <h1 className="text">XYZ UNIVERSITY</h1>
//         <button className="button">LOGIN</button>
//       </div>
//     </div>
    
//   </>
//   );
// };

// export default Index;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Index = () => {
  const navigate = useNavigate(); // React Router's navigation hook

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="centered-container">
      <div>
        <h1 className="large-text">Welcome to </h1>
        <h1 className="text">XYZ UNIVERSITY</h1>
        <button className="button" onClick={handleLoginClick}>LOGIN</button>
      </div>
    </div>
  );
};

export default Index;
