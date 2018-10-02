import React from 'react';
import '../app.css';

const Timer = (props) => {
  const {
    timer: {
      description, duration,
    }, onClick, key,
  } = { ...props };
  return (
    <p className="timer">
      <a data-key={key} tabIndex={key} onKeyPress={e => e.keyCode === 13 && onClick} onClick={onClick} role="button">{`${description}: ${duration}`}</a>
    </p>
  );
};

export default Timer;
