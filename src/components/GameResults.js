import './Results.css';
import React from 'react';
import Button from './Button';
import formatTime from '../formatTime';

const GameResults = props => {
  
  let sum = 0;
  for (let i=0; i<props.timePerQuestion.length; i++) {
    sum += props.timePerQuestion[i];
  }
  const avg = formatTime(sum / props.timePerQuestion.length);

  return (
    <React.Fragment>
      <table className="results-table">
        <tr>
          <td>Your High Score</td>
          <td>{ props.highScore }</td>
        </tr>
        <tr>
          <td>Average Time per Question</td>
          <td>{ avg.seconds }.{ avg.milliseconds } secs</td>
        </tr>
        <tr>
          <td>Questions Answered Correctly</td>
          <td>{ props.questionsAnswered }</td>
        </tr>
      </table>

      <div className="options-wrapper">
        <div className="options">
          <Button onClick={ () => props.setIsGameActive(false) } color='primary'>Play Again</Button>
        </div>
        <div className="options">
          <Button onClick={ () => console.log('leaderboard') } color='primary'>View Leaderboard</Button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default GameResults