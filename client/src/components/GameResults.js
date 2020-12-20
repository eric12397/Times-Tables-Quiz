import './Table.css';
import React, { useEffect } from 'react';
import Button from './Button';
import formatTime from '../formatTime';
import { useHistory } from 'react-router-dom';

const GameResults = props => {
  const history = useHistory();

  let sum = 0;
  for (let i=0; i<props.timePerQuestion.length; i++) {
    sum += props.timePerQuestion[i];
  }
  const avg = formatTime(sum / props.timePerQuestion.length);

  useEffect(() => {
    const updateStats = times => {
      console.log("SENDING STATS");
      console.log(props.timePerQuestion);
    }
    updateStats(props.timePerQuestion);
  }, [props.timePerQuestion]);
  
  return (
    <React.Fragment>
      <table className="table game-results">
        <tbody>
        <tr>
          <td>Your Current Score</td>
          <td>{ props.currentScore }</td>
        </tr>
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
        </tbody>
      </table>

      <div className="options-wrapper">
        <div className="options">
          <Button handleClick={ () => props.setIsGameActive(false) } color='primary'>Play Again</Button>
        </div>
        <div className="options">
          <Button handleClick={ () => history.push('/leaderboard') } color='primary'>View Leaderboard</Button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default GameResults