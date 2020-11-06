import './Question.css';
import React from 'react'

const Question = props => {
  const correctAnswer = props.firstFactor * props.secondFactor;

  return (
    <div className="question-container">
      <span>{ props.firstFactor }</span> x 
      <span> { props.secondFactor }</span> = 
      <span> { props.isAnswered ? correctAnswer : '?' } </span>
    </div>
  )
}

export default Question