import React from 'react'

import '../App.css'


const Clock = (props) => {
  const {loadedTimer} = {...props}
  return (
    <div className="clock">
      <p>{loadedTimer && loadedTimer.duration}</p>
    </div>
  )
}

export default Clock
