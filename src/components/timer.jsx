import React from 'react';
import '../app.css';

const format = (input) => {
  const seconds = input >= 0 ? input : input * -1;
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 3600 % 60);
  return `${(m < 10 ? '0' : '') + m}:${s < 10 ? '0' : ''}${s}`;
};

const Timer = (props) => {
  const {
    timer: {
      description, duration,
    }, loadTimer, index,
  } = { ...props };
  return (
    <p className="timer">
      <a data-key={index} tabIndex={index} onKeyPress={e => e.keyCode === 13 && loadTimer} onClick={loadTimer} role="button">{`${description}: ${format(duration)}`}</a>
    </p>
  );
};

export default Timer;
