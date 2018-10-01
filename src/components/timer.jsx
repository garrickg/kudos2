import React from 'react'
import '../App.css'

const Timer = (props) => {
  const { timer: { key, description, startTime, stopTime, duration, elapsed, loadTimer }, onClick } = {...props};
  return (
    <p className='timer'>
      <a data-key={key} onClick={onClick}>{`${description}: ${duration}`}</a>
    </p>
  )
}

export default Timer
