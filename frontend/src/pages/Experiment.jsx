import React, { lazy, useEffect, useState } from 'react';
import '../assets/styles.css';
import Header from '../components/header'; // Assuming you have a Header component
import LeastCountCalculator from '../components/LeastCountCalculator';
import Observation from '../components/Observation';
import ImageViewer from '../components/ImageViewer';



function Experiment() {

  const [selectedPaper, setSelectedPaper] = useState('A'); // Default to Paper A
  const [length, setLength] = useState('');
  const [microscopePosition, setMicroscopePosition] = useState(50); // Position of the microscope slider
  const [lightOn, setLightOn] = useState(false); // Light toggle
  const [msrValues, setMsrValues] = useState(['', '', '', '']);
  const [vsdValues, setVsdValues] = useState(['', '', '', '']);
   

  
  const [xValue, setXValue] = useState();
  const [yValue, setYValue] = useState();
  const [leastCount, setLeastCount] = useState(null);

  const [timerActive, setTimerActive] = useState(false); 
  const [time, setTime] = useState(0); // Timer in seconds

  const toggleLight = () => setLightOn(!lightOn);

  const handlePaperSelect = (paper) => {
    setSelectedPaper(paper);
  };

  const calculateLC = () => {
    // Calculate the Least Count (LC)
    const lc = (parseFloat(xValue) / parseFloat(yValue)).toFixed(3);
    setLeastCount(isNaN(lc) ? 'Invalid input' : lc);
  };

  const clearInputs = () => {
    setLength('');
    setXValue('');
    setYValue('');
    setMsrValues(['', '', '', '']);
    setVsdValues(['', '', '', '']);
  };
  
  const startExperiment = () => {
    clearInputs();
    setTimerActive(true);
    setTime(0); // Reset the timer when starting the experiment
  };

  // Update the timer every second when timer is active
  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval); // Clear interval on cleanup
  }, [timerActive]);

   // Convert seconds to mm:ss format
   const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

 
  
  return (
    <div className="container">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
    
      <Header 
        startExperiment={startExperiment} 
        timer={formatTime(time)} 
        timerActive={timerActive}
      />
      <div className="row">
        <div className="col-md-6">
          <LeastCountCalculator
            xValue={xValue}
            setXValue={setXValue}
            yValue={yValue}
            setYValue={setYValue}
            leastCount={leastCount}
            setLeastCount={setLeastCount}
            calculateLC={calculateLC}
            timerActive={timerActive}
          />
          <Observation 
            toggleLight={toggleLight}
            handlePaperSelect={handlePaperSelect}
            length={length}
            setLength={setLength}
            // microscopePosition={microscopePosition}
            // setMicroscopePosition={setMicroscopePosition}
            msrValues={msrValues}
            setMsrValues={setMsrValues}
            vsdValues={vsdValues}
            setVsdValues={setVsdValues}
            lightOn={lightOn}
            selectedPaper={selectedPaper}
            leastCount={leastCount}
            timerActive={timerActive}
            setTimerActive={setTimerActive}
            time={time}
            clearInputs={clearInputs}
          />
        </div>
        <div className="col-md-6">
          <ImageViewer
            selectedPaper={selectedPaper}
            lightOn={lightOn}
            microscopePosition={microscopePosition}
            // microscopePosition={microscopePosition}
            setMicroscopePosition={setMicroscopePosition}
          />
        </div>
      </div>
    </div>

  );
}

export default Experiment;
