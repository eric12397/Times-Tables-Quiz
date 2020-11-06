import './Timer.css';
import React, { useState, useEffect } from 'react'

const Timer = props => {

  const getTimerStyle = () => {
    if (props.timer > 50) {
      return 'green-bar';
    } else if (props.timer > 25) {
      return 'yellow-bar';
    } else {
      return 'red-bar'
    }
  }
 
  return (
    <div className="timer">
      <span className={`timer-bar ${ getTimerStyle() }`} style={{ width:`${ props.timer }%` }}></span>
    </div>
  )
}

export default Timer