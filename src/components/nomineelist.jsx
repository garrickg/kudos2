import '../app.css';

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Nominee from './nominee';

const NomineeList = (props) => {
  const {
    nominees, undo, undoAnimation, removeNominee,
  } = { ...props };
  const [animation, timeout] = undoAnimation ? ['undo', 300] : ['nominate', 2000];
  return (
    <div className="list-of-nominees">
      <button className="undo-button" onClick={undo} type="button">
        {' '}
        <i className="fa fa-undo" aria-hidden="true" />
      </button>
      <ReactCSSTransitionGroup
        transitionName={`${animation}-animation`}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={timeout}
      >
        {
        Object
          .keys(nominees)
          .map((key) => {
            const nominee = nominees[key];
            // All components given unique key for proper animations
            return <Nominee key={`${nominee.NomKey}.${nominee.index}`} name={nominee} index={key} removeNominee={removeNominee} />;
          })
      }
      </ReactCSSTransitionGroup>
      <span className="counter">{nominees.length}</span>
    </div>
  );
};

export default NomineeList;
