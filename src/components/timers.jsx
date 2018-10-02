import React, { Component } from 'react';
import Moment from 'moment';
import Base from '../base';
import '../app.css';
import TimerList from './timerlist';
import Clock from './clock';

class Timers extends Component {
// Setting intial state
state = {
  timers: [],
  loadedTimer: null,
// timers: [{
//   description: 'Second',
//   startTime: Moment().format('MMMM Do YYYY, h:mm:ss a'),
//   stopTime: Moment().format('MMMM Do YYYY, h:mm:ss a'),
//   position: 1,
//   duration: 500,
//   elapsed: null
// }, {
//   description: 'First',
//   startTime: Moment().format('MMMM Do YYYY, h:mm:ss a'),
//   stopTime: Moment().format('MMMM Do YYYY, h:mm:ss a'),
//   position: 0,
//   duration: 500,
//   elapsed: null
// }]
// Complete list of timers
// Timer object:
// {
//   startTime: dateTime, time when timer began
//   stopTime: dateTime, time when switch to next timer
//   position: integer, order in which timer appears
//   description: string, short description of timer
//   duration: seconds, desired length of timer
//   elapsed: seconds, actual runtime
// }
}

componentWillMount() {
// Format is 'MMM DD, YYYY'
  const today = Moment().format('LL');

  // Sync list of timers in DB to App
  this.timersRef = Base.syncState(`timers/${today}`, {
    context: this,
    state: 'timers',
    asArray: true,
  });
}

// Highlight input box on load for quicker typing
componentDidMount() {
}

// Removed DB bindings on close
componentWillUnmount() {
  Base.removeBinding(this.timersRef);
}

handleDefault = (e) => {
  e.preventDefault();
}

loadTimer = (e) => {
  const { timers } = this.state;
  const { key } = e.target.dataset;
  this.setState({
    loadedTimer: timers[key],
  });
}

render() {
  const { timers, loadedTimer } = this.state;
  return (
    <div>
      <TimerList timers={timers} onClick={this.loadTimer} />
      <Clock loadedTimer={loadedTimer} />
    </div>
  );
}
}

export default Timers;
