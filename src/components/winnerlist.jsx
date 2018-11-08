import '../App.css';

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Winner from './winner';

const WinnerList = (props) => {
  const { pickWinner, winners } = { ...props };
  return (
    <div className="list-of-winners">
      <button className="win-button" onClick={pickWinner} type="button"><i className="fa fa-trophy" aria-hidden="true" /></button>
      <ReactCSSTransitionGroup
        transitionName="win-animation"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {
          Object
            .keys(winners)
            .map(key => <Winner key={key} name={winners[key]} index={key} />)
        }
      </ReactCSSTransitionGroup>
    </div>
  );
};

export default WinnerList;
