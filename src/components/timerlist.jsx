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
        .sort((a, b) => (timers[a].position > timers[b].position ? 1 : -1))
        .map(key => <Timer key={key} index={key} timer={timers[key]} loadTimer={loadTimer} />)
    }
    </div>
  );
};

export default TimerList;
