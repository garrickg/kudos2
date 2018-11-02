import React, { Component } from 'react';

import '../app.css';

class Clock extends Component {
  state = {
    time: 0,
    play: false,
    onBreak: false,
    color: '#00A48C',
    fill: 0,
  }

  componentDidUpdate(prevProps) {
    const { loadedTimer } = { ...this.props };
    if (loadedTimer !== prevProps.loadedTimer) {
      const { duration } = loadedTimer;
      this.toggleOnBreak();
      this.setTime(duration);
    }
  }

  setTime = (newTime = 0) => {
    const newState = { ...this.state };
    newState.time = newTime;
    this.setState(newState);
  }

  toggleOnBreak = (state = false) => {
    const newState = { ...this.state };
    newState.onBreak = state;
    this.setState(newState);
  }

  formatTime = (input) => {
    const seconds = input >= 0 ? input : input * -1;
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 3600 % 60);
    return `${(m < 10 ? '0' : '')}${m}:${s < 10 ? '0' : ''}${s}`;
  }

  elapseTime = () => {
    const { play } = this.state;
    if (play) {
      const newState = { ...this.state };
      newState.time -= 1;
      this.setState(newState);
      this.fillClock();
    }
  }

  restartInterval = () => {
    clearInterval(this.interval);
    this.interval = setInterval(this.elapseTime, 1000);
  }

  play = () => {
    const newState = { ...this.state };
    newState.play = !newState.play;
    this.restartInterval();
    this.setState(newState);
  }

  break = () => {
    clearInterval(this.interval);
    this.setTime(30);
    this.restartInterval();
    this.setState({
      onBreak: true,
      play: true,
    });
  }

  next = (e) => {
    const { nextTimer, updateTimer, loadedTimer } = { ...this.props };
    const { onBreak, time } = this.state;
    if (onBreak) {
      this.setState({
        onBreak: false,
      });
      nextTimer(e);
    } else {
      updateTimer(loadedTimer, time);
      this.break();
    }
  }

  fillClock = () => {
    const { loadedTimer: { duration } } = { ...this.props };
    const { time, onBreak } = this.state;
    const color = time >= 0 ? '#00A48C' : '#F26721';
    const fill = !onBreak ? 100 * (duration - time) / duration : 0;
    this.setState({
      color,
      fill,
    });
  }

  render() {
    const {
      time, play, fill, color, onBreak,
    } = this.state;
    const { loadedTimer } = { ...this.props };
    const style = {
      borderColor: color,
      background: `linear-gradient(0, ${color} ${fill}%, #787A7A ${fill}%)`,
    };
    return (
      <div>
        {!!loadedTimer && (
          <div className="clock">
            <h1>{!onBreak ? loadedTimer.description : 'Break'}</h1>
            <p className="clockface" style={style}>{this.formatTime(time)}</p>
            <button id="play" type="button" onClick={this.play}>{!play ? 'Start' : 'Pause'}</button>
            <button id="next" type="button" onClick={this.next}>Next</button>
          </div>)
        }
      </div>
    );
  }
}

export default Clock;
