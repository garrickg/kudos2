import React, { Component } from 'react';

import '../app.css';

class Clock extends Component {
  state = {
    time: 0,
    play: false,
    onBreak: false,
  }

  componentDidUpdate(prevProps) {
    if (this.props.loadedTimer !== prevProps.loadedTimer) {
      const { duration } = this.props.loadedTimer;
      this.setTime(duration);
      this.setState({
        onBreak: false,
      })
    }
  }

  setTime = (newTime = 0) => {
    const newState = {...this.state};
    newState.time = newTime;
    this.setState(newState);
  }

  format = (seconds) => {
    if (seconds < 0) {
      seconds *= -1;
    }
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 3600 % 60);
    const timeFormated = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
    return timeFormated;
  }

  elapseTime = () => {
    if (this.state.play === true || this.state.onBreak) {
      const newState = {...this.state};
      newState.time -= 1;
      this.setState(newState);
    }
  }

  restartInterval = () => {
    clearInterval(this.interval);
    this.interval = setInterval(this.elapseTime, 1000);
  }

  play = () => {
    const newState = {...this.state};
    newState.play = !newState.play;
    this.restartInterval();
    this.setState(newState);
  }

  reset = () => {
    clearInterval(this.interval);
    const { duration } = this.props.loadedTimer;
    this.setTime(duration);
  }

  break = () => {
    clearInterval(this.interval);
    this.setTime(30);
    this.restartInterval();
    this.setState({
      onBreak: true,
    })
  }

  render() {
    const { time, onBreak } = this.state;
    return(
      <div className="clock">
      <p style={{color: time >= 0 ? "white" : "red"}}>{this.format(time)}</p>
      <button type="button" onClick={this.play} disabled={this.state.loadedTimer}>{!this.state.play ? "Start" : "Pause"}</button>
      <button type="button" onClick={this.reset}>Reset</button>
      <button type="button" onClick={onBreak ? this.props.nextTimer : this.break}>Next</button>
    </div>
    )
  }
}

export default Clock;
