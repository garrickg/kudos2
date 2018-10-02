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
  loadedTimerIdx: null,
// Timer object:
// {
//   startTime: dateTime, time when timer began, format('MMMM Do YYYY, h:mm:ss a')
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

// Removed DB bindings on close
componentWillUnmount() {
  Base.removeBinding(this.timersRef);
}

handleDefault = (e) => {
  e.preventDefault();
}

loadTimer = (e) => {
  const { key } = e.target.dataset;
  this.setState({
    loadedTimerIdx: key,
  });
}

startTimer = (e) => {
  console.log('clicked');
  const { timers, loadedTimerIdx } = this.state;
  setInterval(() => { timers[loadedTimerIdx].elapsed += 1; }, 1000);
  this.setState({
    timers,
  });
}

stopTimer = (e) => {
  console.log('clicked');
}

resetTimer = (e) => {
  console.log('clicked');
}

nextTimer = (e) => {
  console.log('clicked');
}

render() {
  const { timers, loadedTimerIdx } = this.state;
  return (
    <div>
      <TimerList timers={timers} loadTimer={this.loadTimer} />
      <Clock
        loadedTimer={timers[loadedTimerIdx]}
        startTimer={this.startTimer}
        stopTimer={this.stopTimer}
        resetTimer={this.resetTimer}
        nextTimer={this.nextTimer}
      />
    </div>
  );
}
}

export default Timers;
