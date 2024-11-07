import React from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react"; // Importing close icon from lucide-react

const ProcedurePage = () => {
  const navigate = useNavigate(); // v6 hook for navigation

  const handleGoHome = () => {
    navigate("/"); // Navigate to home page
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="bg-white text-black rounded-lg shadow-2xl p-8 max-w-3xl w-full transform transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-center text-black">Wedge Shape Experiment</h1>
          <X 
            className="text-gray-600 cursor-pointer hover:text-gray-800" 
            onClick={handleGoHome} 
          />
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-black mb-4">Procedure</h2>
          <ol className="list-decimal pl-5 space-y-3 text-lg text-black">
            <li>Click "Start" to begin the experiment.</li>
            <li>Calculate LC (Least Count).</li>
            <li>Turn on the lights for the experiment.</li>
            <li>Select the paper to measure from the available options.</li>
            <li>Insert the length of the glass plate into the system.</li>
            <li>Note down the reading in the book.</li>
            <li>Insert the noted value in table.</li>
            <li>Calculate Beta (β) and Thickness (t) using the collected data.</li>
            <li>Finally, download the experiment results.</li>
          </ol>
          <p className="mt-4 text-lg text-black">
            <strong>Note:</strong> To start the next trial, click "Start".
          </p>
        </div>
        {/* YouTube Video Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-black mb-4">How to take a reading using a traveling microscope:</h3>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/fwG_YB6MN2k?si=q8FRy0VA2vmS7hlC" // Replace VIDEO_ID with the actual video ID
              title="Wedge Shape Experiment Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        {/* Buttons Section */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => {
              window.open('https://forms.gle/jFsqrbAvvdhwPbJNA', '_blank'); // Redirects to the About page
            }}
            className="py-2 px-6 text-white bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition duration-200"
          >
            Pre-Test
          </button>
          <button
            onClick={handleGoHome}
            className="py-2 px-6 text-white bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition duration-200"
          >
            Go to Simulation
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProcedurePage;
