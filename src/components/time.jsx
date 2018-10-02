import '../app.css';

import React, { Component } from 'react';

import Base from '../base';

class Time extends Component {
  // Setting intial state
  state = {
    // timers: [],
    // runnning: false,
  }

  componentWillMount() {
    // Format is 'MMM DD, YYYY'
    // const today = Moment().format('LL');

    // Sync list of timers in DB to App
    this.timersRef = Base.syncState('timers', {
      context: this,
      state: 'timers',
      asArray: true,
    });
  }

  componentDidMount() {

  }

  // Removed DB bindings on close
  componentWillUnmount() {
    Base.removeBinding(this.timersRef);
  }

  addTimer = (e) => {
    console.log('add timer');
  }

  removeTimer = (e) => {
    console.log('remove timer');
  }

  toggleTimer = (e) => {
    console.log('toggle timer');
  }

  nextTimer = (e) => {
    console.log('next timer');
  }

  handleDefault = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <p>Timer</p>
      </div>
    );
  }
}

export default Time;
