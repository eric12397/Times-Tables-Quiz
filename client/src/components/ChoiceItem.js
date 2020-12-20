import React, { useState } from 'react';

const ChoiceItem = (props) => {
  const [choiceValue, setChoiceValue] = useState(null);

  const getChoiceStyle = () => {
    if (props.isPending && props.choice === props.correctAnswer) {
      return 'success-glow';
    } else if (props.isPending && !props.isCorrect && choiceValue === props.choice) {
      return 'failure-glow';
    }
  }

  const handleClick = event => {
    setChoiceValue(parseInt(event.target.id))
    props.evaluateInput(props.choice)
  }

  return (
    <div 
      className={`choice ${ getChoiceStyle() }`} 
      onClick={ handleClick }
      id={ props.choice }
    >
      { props.choice }
    </div>
  )
}

export default ChoiceItem