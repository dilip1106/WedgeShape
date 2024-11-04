import React, { useState } from 'react'; // Adjust the path as necessary
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Header = ({ startExperiment,timer,timerActive={timerActive} }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate(); // Initialize useNavigate
  // const [experimentStarted, setExperimentStarted] = useState(false); // State to track experiment status

  const handleLogout = () => {
    logout();
  };

  // Function to navigate to the admin page
  const handleAdminPage = () => {
    navigate('/admin'); // Replace '/admin' with your desired admin page route
  };

  const handleExperiment = () => {
    startExperiment();
    setExperimentStarted(true); // Set experiment as started
  };

  return (
    <div className="row">
      <div className="col-12 d-flex justify-content-between align-items-center">
        <h1>Wedge Shaped Thin Film</h1>
        <div className="d-flex align-items-center">
          <button 
            onClick={handleExperiment} 
            className={`btn ${timerActive ? 'btn-danger' : 'btn-success'} mr-2`} // Change color based on state
          >
            {timerActive ? 'Restart' : 'Start'} {/* Change button text */}
          </button>
          {timer && <span className="ml-2">Time: {timer}</span>} {/* Display timer */}
        </div>
        {user && (
          <div className="d-flex align-items-center">
            <span className="mr-2">Welcome, {user.name}!</span> {/* Display the user's name */}
            <button
              onClick={handleLogout}
              className="btn btn-primary mr-2" // Bootstrap class for blue background
            >
              Logout
            </button>
            {/* Conditionally render the Admin Page button for teachers */}
            {user.role === 'teacher' && ( // Check if the user role is 'teacher'
              <button
                onClick={handleAdminPage}
                className="btn btn-secondary" // Bootstrap class for a different style
              >
                Admin Page
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
