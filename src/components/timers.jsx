import React, { Component } from 'react';
import Moment from 'moment';
import Base from '../base';
import '../app.css';
import TimerList from './timerlist';
import Clock from './clock';
import AddTimerModal from './addtimermodal';

class Timers extends Component {
// Setting intial state
state = {
  timers: [],
  sortedTimers: [],
  loadedTimerIdx: null,
  modalOpen: false,
// Timer object:
// {
//   stopTime: dateTime, time when switch to next timer, format('MMMM Do YYYY, h:mm:ss a')
//   pos: integer, order in which timer appears
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
    then() {
      const { timers } = this.state;
      const sortedTimers = timers.sort((a, b) => (a.pos > b.pos ? 1 : -1));
      this.setState({
        sortedTimers,
      });
    },
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

nextTimer = () => {
  const newState = { ...this.state };
  if (newState.loadedTimerIdx < newState.timers.length - 1) {
    newState.loadedTimerIdx = +newState.loadedTimerIdx + 1;
  }
  this.setState(newState);
}

updateTimer = (loadedTimer, time) => {
  const { key, duration } = loadedTimer;
  const elapsedTime = duration - time;
  const newState = { ...this.state };
  const timerIdx = newState.timers.findIndex(i => i.key === key);
  newState.timers[timerIdx].elapsed = elapsedTime;
  newState.timers[timerIdx].stopTime = Moment().format('MMMM Do YYYY, h:mm:ss a');
  this.setState(newState);
}

openModal = () => {
  this.setState({
    modalOpen: true,
  });
}

closeModal = () => {
  this.setState({
    modalOpen: false,
  });
}

addTimer = (e) => {
  e.preventDefault();
  const { target: { description: { value: description }, duration: { value: duration } } } = e;
  const newState = { ...this.state };
  newState.timers.push({
    description,
    duration,
    elapsed: 0,
    pos: newState.timers[newState.timers.length - 1].pos + 1,
  });
  this.setState(newState);
  this.closeModal();
}

render() {
  const { sortedTimers, loadedTimerIdx, modalOpen } = this.state;
  return (
    <div>
      <TimerList timers={sortedTimers} loadTimer={this.loadTimer} open={this.openModal} />
      <Clock
        loadedTimer={sortedTimers[loadedTimerIdx]}
        nextTimer={this.nextTimer}
        updateTimer={this.updateTimer}
      />
      <AddTimerModal open={modalOpen} close={this.closeModal} addTimer={this.addTimer} />
    </div>
  );
}
}

export default Timers;
