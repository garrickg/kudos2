import React, { Component } from 'react';

import '../App.css';

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
    const fill = !onBreak ? 100 * (duration - time) / duration : 0;
    let color;
    switch (true) {
      case (fill < 90):
        color = '#00A48C';
        break;
      case (fill < 91):
        color = '#02AC64';
        break;
      case (fill < 92):
        color = '#05B539';
        break;
      case (fill < 93):
        color = '#08BD0B';
        break;
      case (fill < 94):
        color = '#3DC60C';
        break;
      case (fill < 95):
        color = '#78CF0F';
        break;
      case (fill < 96):
        color = '#B5D813';
        break;
      case (fill < 97):
        color = '#E0CB17';
        break;
      case (fill < 98):
        color = '#E99A1C';
        break;
      case (fill < 99):
        color = '#F16620';
        break;
      case (fill > 99):
        color = '#F26721';
        break;
      default:
        break;
    }
    // const color = time >= 0 ? '#00A48C' : '#F26721';
    this.setState({
      color,
      fill,
    });
  }

  render() {
    const {
      time, play, fill, color, onBreak,
    } = this.state;
    const { loadedTimer, lastTimer } = { ...this.props };
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
            {!lastTimer && <button id="next" type="button" onClick={this.next}>Next</button>}
          </div>)
        }
      </div>
    );
  }
}

export default Clock;
