import React from 'react';
import '../app.css';
import Timer from './timer';

const TimerList = (props) => {
  const { timers, loadTimer } = { ...props };
  return (
    <div className="list-of-timers">
      {
      Object
        .keys(timers)
        .map(key => <Timer key={key} index={key} timer={timers[key]} loadTimer={loadTimer} />)
    }
    </div>
  );
};

export default TimerList;
