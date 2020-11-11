import './QuestionContainer.css';
import React from 'react'

const QuestionContainer = props => {
  const correctAnswer = props.firstFactor * props.secondFactor;

  const getBorderStyle = () => {
    if (props.isPending && props.isCorrect) {
      return 'success-border';
    } else if (props.isPending && !props.isCorrect) {
      return 'failure-border';
    }
  }
  return (
    <div className={`question-container ${ getBorderStyle() }`}>
      <span>{ props.firstFactor }</span> x 
      <span> { props.secondFactor }</span> = 
      <span> { props.isPending ? correctAnswer : '?' } </span>
    </div>
  )
}

export default QuestionContainer