import '../app.css';

import React from 'react';

const Nominee = (props) => {
  const { index, removeNominee, name: { First, Last } } = { ...props };
  return (
    <span className="nominee" data-key={index} onClick={removeNominee} onKeyPress={e => e.keyCode === 13 && removeNominee} role="button" tabIndex={0}>
      {`${First} ${Last}`}
    </span>
  );
};

export default Nominee;
