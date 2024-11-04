import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // for generating tables in pdf
import { useAuthStore } from '../store/authStore';
import Swal from 'sweetalert2'; 
import toast from 'react-hot-toast';
const Observation = ({
  toggleLight,
  handlePaperSelect,
  length,
  setLength,
  microscopePosition,
  setMicroscopePosition,
  msrValues,
  setMsrValues,
  vsdValues,
  setVsdValues,
  lightOn,
  selectedPaper,
  leastCount,
  timerActive={timerActive},
  setTimerActive={setTimerActive},
  time={time},
  clearInputs={clearInputs},
}) => {

  const [cal, setCal] = useState(null);
  const [cal1, setCal1] = useState(null);
  const [trValues, setTrValues] = useState(['', '', '', '']);
  const [betaValues, setBetaValues] = useState(['-', '-', '-', '-']);
  const [mean5Beta, setMean5Beta] = useState(null);
  const [meanBeta, setMeanBeta] = useState(null);
  const [calculatedThickness, setCalculatedThickness] = useState(null);


  const { saveTimeToDatabase} = useAuthStore();

  const handleButtonClick = (callback) => {
    if (!timerActive) {
      toast.error('Timer is not active. Please start the experiment first.');
    } else {
      callback();
    }
  };

  const calculateBeta = () => {
    const newTrValues = [];
    const newBetaValues = ['-', '-', '-', '-'];
    const lc = parseFloat(leastCount);
    const lc1 = parseFloat(leastCount);
    let prevTr = null;

    for (let i = 0; i < msrValues.length; i++) {
      const msr = parseFloat(msrValues[i]);
      const vsd = parseFloat(vsdValues[i]);
      const currentLC = i < 2 ? lc : lc1;

      // Calculate TR
      const trValue = msr + vsd * currentLC;
      newTrValues.push(trValue.toFixed(3));

      // Calculate β if there's a previous TR value
      if (prevTr !== null) {
        const betaValue = Math.abs(trValue - prevTr) * 5;
        newBetaValues[i - 1] = betaValue.toFixed(3);
      }
      prevTr = trValue;
    }

    setTrValues(newTrValues);
    setBetaValues(newBetaValues);

    calculateMeanBeta(newBetaValues);
  };

  const calculateMeanBeta = (betaValues) => {
    const validBetaValues = betaValues.slice(0, 3).map(Number).filter(Boolean);
    const mean5Beta = validBetaValues.reduce((sum, val) => sum + val, 0) / validBetaValues.length;
    const meanBeta = mean5Beta / 5;

    setMean5Beta(mean5Beta.toFixed(3));
    setMeanBeta(meanBeta.toFixed(3));
  };

  const calculateThickness = () => {
    const lambda = 5890; // Wavelength of light in Ångström
    const z0 = 2 * parseFloat(meanBeta);
    const t = (lambda * parseFloat(length)) / z0 / 1e8;

    setCalculatedThickness(t.toFixed(4));
  };

  // Function to download observation data as PDF
  const downloadDataAsPDF = () => {
    
        // Create PDF
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.text('Observation Data', 14, 10);

        // Add Table
        const tableColumn = ["Fringe No.", "MSR", "VSD", "TR", "β"];
        const tableRows = msrValues.map((_, index) => [
          index === 0 ? 'n' : index === 1 ? 'n+5' : index === 2 ? 'n+10' : 'n+15',
          msrValues[index],
          vsdValues[index],
          trValues[index],
          betaValues[index],
        ]);

        doc.autoTable(tableColumn, tableRows, { startY: 20 });

        // Add Calculations
        doc.text(`Least Count: ${leastCount || 'N/A'}`, 14, doc.lastAutoTable.finalY + 10);
        doc.text(`Mean5Beta: ${mean5Beta !== null ? mean5Beta : 'N/A'}`, 14, doc.lastAutoTable.finalY + 15);
        doc.text(`MeanBeta: ${meanBeta !== null ? meanBeta : 'N/A'}`, 14, doc.lastAutoTable.finalY + 20);
        doc.text(`Calculated Thickness: ${calculatedThickness !== null ? calculatedThickness + ' cm' : 'N/A'}`, 14, doc.lastAutoTable.finalY + 25);

        // Save the PDF
        doc.save('observation_data.pdf');

        
       stopTimer();
  };

  const stopTimer = async () => {
    setTimerActive(false);
    await saveTimeToDatabase(time,calculatedThickness); // Call the function to save time to the database
  };
  
  
  
  return (
    <div className="card">
      <h3 className="card-header bg-primary text-white">Observation</h3>
      <div className="card-body">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h5>Wavelength of light (λ=5890 Å)</h5>
          <button onClick={toggleLight} className={`button button1 ${lightOn ? 'Active' : ''}`} style={{ marginLeft: '20px' }}>
            {lightOn ? 'Light On' : 'Light Off'}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <h5>Select Paper to Measure Thickness</h5>
          <button
            onClick={() => handlePaperSelect('A')}
            className={`button button2 ${selectedPaper === 'A' ? 'Active' : ''}`}
            style={{ marginLeft: '10px' }}
          >
            A
          </button>
          <button
            onClick={() => handlePaperSelect('B')}
            className={`button button2 ${selectedPaper === 'B' ? 'Active' : ''}`}
            style={{ marginLeft: '10px' }}
          >
            B
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <h5>Length of Glass Plate (L)</h5>
          <input
            type="text"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            placeholder="L value"
            style={{ marginLeft: '10px', width: '100px' }}
          />
          <h5 style={{ marginLeft: '5px' }}>cm</h5>
        </div>

        {/* <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <h5>Microscope Position</h5>
          <input
            type="range"
            min="0"
            max="100"
            value={microscopePosition}
            onChange={(e) => setMicroscopePosition(e.target.value)}
            style={{ marginLeft: '10px', flex: 1 }}
          />
        </div> */}

        <table className="table table-striped" style={{ marginTop: '10px' }}>
          <thead className="thead-dark">
            <tr>
              <th>Fringe No.</th>
              <th>MSR</th>
              <th>VSD</th>
              <th>TR</th>
              <th>β</th>
            </tr>
          </thead>
          <tbody>
            {['n', 'n+5', 'n+10', 'n+15'].map((label, index) => (
              <tr key={index}>
                <th>{label}</th>
                <td>
                  <input type="text" value={msrValues[index]} onChange={(e) => {
                    const newValues = [...msrValues];
                    newValues[index] = e.target.value;
                    setMsrValues(newValues);
                  }} placeholder="value" style={{ width: '100%' }}
                  />
                </td>
                <td>
                  <input type="text" value={vsdValues[index]} onChange={(e) => {
                    const newValues = [...vsdValues];
                    newValues[index] = e.target.value;
                    setVsdValues(newValues);
                  }} placeholder="value" style={{ width: '100%' }} />
                </td>
                <td>{trValues[index]}</td>
                <td>{betaValues[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={() => handleButtonClick(calculateBeta)} className="button button1" style={{ marginTop: '10px' }}>
          Calculate β
        </button>

        <div style={{display: "flex", marginTop: '10px' }}>
          <h5 id="output4">{mean5Beta !== null ? `Mean5Beta = ${mean5Beta}` : ''}</h5>
          <h5 id="output6" style={{marginLeft:"30px"}}>{meanBeta !== null ? `MeanBeta = ${meanBeta}` : ''}</h5>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <h5>Thickness (t=λL/2β)</h5>
          <button onClick={() => handleButtonClick(calculateThickness)} className="button button1" style={{ marginLeft: '10px' }}>
            Calculate Thickness
          </button>
          <h5 style={{ marginLeft: '10px' }}>{calculatedThickness !== null ? `t = ${calculatedThickness} cm` : ''}</h5>
        </div>

        <button onClick={downloadDataAsPDF} className="button button1" style={{ marginTop: '20px' }}>
          Download
        </button>
      </div>
    </div>
  );
};

export default Observation;
