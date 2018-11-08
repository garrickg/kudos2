import '../App.css';

import React from 'react';

const Winner = (props) => {
  const { index, name: { First, Last } } = { ...props };
  return (
    <p className="winner" data-key={index}>
      {`${First} ${Last}`}
    </p>
  );
};

export default Winner;
