import React from 'react';
import { RiArrowGoBackLine } from 'react-icons/ri';

const Results = props => {
  return (
    <React.Fragment>
    <RiArrowGoBackLine onClick={ props.backToMenu } style={{ color: '#4da9f2' }}/>

    <div style={{ color: 'white' }}>
      # Correct: { props.correctQuestions } - # Incorrect: { props.incorrectQuestions }
    </div>
    </React.Fragment>
   )
}

export default Results