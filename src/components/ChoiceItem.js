import React from 'react';

const ChoiceItem = (props) => {
  const getChoiceStyle = () => {
    if (props.isAnswered && props.choice === props.correctAnswer) {
      return 'success-glow';
    } else if (!props.isCorrect && props.isAnswered) {
      return 'failure-glow';
    }
  }

  const handleClick = event => {
    props.evaluateInput(props.choice)
  }

  return (
    <div className={`choice ${ getChoiceStyle() }`} onClick={ handleClick }>
      { props.choice }
    </div>
  )
}

export default ChoiceItem