import React from 'react';

const LeastCountCalculator = ({
  xValue,
  setXValue,
  yValue,
  setYValue,
  leastCount,
  setLeastCount,
  calculateLC,
}) => {
  return (
    <div className="card" style={{ marginBottom: '1em' }}>
      <h3 className="card-header bg-primary text-white">Least Count Of Travelling Microscope</h3>
      <div className="card-body">
        <div className="slidecontainer">
          <div style={{ display: 'flex', marginTop: '0.5em' }}>
            <h5 style={{ marginTop: '0.4em', marginRight: '1em' }}>Least reading on main scale</h5>
            <input
              type="text"
              value={xValue}
              onChange={(e) => setXValue(e.target.value)}
              placeholder="x value"
              style={{ marginLeft: '41px', width: '20%', border: '1px solid black', borderRadius: '4px' }}
              className="values"
            />
            <h5 style={{ marginTop: '0.4em', marginLeft: '4px' }}>cm</h5>
          </div>

          <div style={{ display: 'flex', marginTop: '0.8em' }}>
            <h5 style={{ marginTop: '0.4em', marginRight: '1em' }}>No of divisions on vernier scale</h5>
            <input
              type="text"
              value={yValue}
              onChange={(e) => setYValue(e.target.value)}
              placeholder="y value"
              style={{ marginLeft: '10px', width: '20%', border: '1px solid black', borderRadius: '4px' }}
              className="values"
            />
            <h5 style={{ marginTop: '0.4em', marginLeft: '4px' }}>cm</h5>
          </div>

          <div style={{ display: 'flex', marginTop: '0.8em' }}>
            <h5 style={{ marginTop: '0.4em', marginRight: '1em' }}>Least Count (LC=x/y)</h5>
            <input type="button" onClick={calculateLC} value="Calculate LC" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <h5>{leastCount !== null ? `LC = ${leastCount.toFixed(3)} cm` : ''}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeastCountCalculator;
