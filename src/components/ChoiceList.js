import './ChoiceList.css';
import React from 'react';
import ChoiceItem from './ChoiceItem';

const ChoiceList = props => {  
  return (
    <div className="choice-container" >
      { props.choices.map(choice => (
          <ChoiceItem 
            choice={ choice }
            correctAnswer={ props.correctAnswer }
            evaluateInput={ props.evaluateInput }
            isCorrect={ props.isCorrect }
            isAnswered={ props.isAnswered }
          />
      ))}
    </div>
  )
}

export default ChoiceList