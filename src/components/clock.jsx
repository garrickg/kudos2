import React from 'react';

import '../app.css';


const Clock = (props) => {
  const {
    loadedTimer, startTimer, stopTimer, resetTimer, nextTimer,
  } = { ...props };
  return (
    <div className="clock">
      <p>{loadedTimer && loadedTimer.duration - loadedTimer.elapsed}</p>
      <button type="button" onClick={startTimer}>Start</button>
      <button type="button" onClick={stopTimer}>Stop</button>
      <button type="button" onClick={resetTimer}>Reset</button>
      <button type="button" onClick={nextTimer}>Next</button>
    </div>
  );
};

export default Clock;
