import React from 'react';
import '../app.css';

const Timer = (props) => {
  const {
    timer: {
      description, duration,
    }, loadTimer, index,
  } = { ...props };
  return (
    <p className="timer">
      <a data-key={index} tabIndex={index} onKeyPress={e => e.keyCode === 13 && loadTimer} onClick={loadTimer} role="button">{`${description}: ${duration}`}</a>
    </p>
  );
};

export default Timer;
