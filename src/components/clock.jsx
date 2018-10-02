import React from 'react';

import '../app.css';


const Clock = (props) => {
  const { loadedTimer } = { ...props };
  return (
    <div className="clock">
      <p>{loadedTimer && loadedTimer.duration}</p>
    </div>
  );
};

export default Clock;
