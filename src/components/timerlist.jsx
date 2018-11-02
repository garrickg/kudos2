import React from 'react';
import '../app.css';
import Timer from './timer';

const TimerList = (props) => {
  const { timers, loadTimer, open } = { ...props };
  return (
    <div className="list-of-timers">
      {
      Object
        .keys(timers)
        .map(key => <Timer key={key} index={key} timer={timers[key]} loadTimer={loadTimer} />)
      }
      <button type="button" style={{ color: 'black' }} onClick={open}>Add New Timer</button>
    </div>
  );
};

export default TimerList;
