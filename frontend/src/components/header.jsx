import React from 'react'; 
import { useAuthStore } from '../store/authStore'; 
import { useNavigate } from 'react-router-dom'; 

const Header = ({ startExperiment, timer, timerActive = false }) => { 
  const { user, logout } = useAuthStore(); 
  const navigate = useNavigate(); 

  const handleLogout = () => { 
    logout(); 
  };

  const handleAdminPage = () => { 
    navigate('/admin'); 
  };

  const handleExperiment = () => { 
    startExperiment(); 
  };

  const handleProcedurePage = () => {
    navigate('/procedure'); // Navigate to the procedure page
  };

  return (
    <div className="p-4 shadow-lg">
      {/* Title Section */}
      <div className="text-black text-center mb-4">
        <h1 className="text-3xl sm:text-4xl font-bold">Wedge Shaped Thin Film</h1>
      </div>

      {/* Button and User Section */}
      <div className="flex flex-wrap justify-between items-center mt-4">
        {/* Left Section (Procedure, Start, and Timer) */}
        <div className="flex space-x-4 mb-4 sm:mb-0">
          <button 
            onClick={handleProcedurePage} 
            className="btn bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md transition duration-200 hover:bg-teal-600">
            Procedure
          </button>
          <button 
            onClick={handleExperiment} 
            className={`btn ${timerActive ? 'bg-red-500' : 'bg-green-500'} text-white px-6 py-2 rounded-lg shadow-md transition duration-200 hover:bg-opacity-80`}>
            {timerActive ? 'Restart' : 'Start'}
          </button>
          {timer && <span className="text-black text-2xl">{timer}</span>}
        </div>

        {/* Right Section (Welcome, Logout, Admin Page) */}
        {user && (
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <span className="text-black text-lg sm:text-xl">Welcome, {user.name}!</span>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleLogout}
                className="btn bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Logout
              </button>
              {user.role === 'teacher' && (
                <button
                  onClick={handleAdminPage}
                  className="btn bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                  Admin Page
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
