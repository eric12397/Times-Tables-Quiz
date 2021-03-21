import './Table.css';
import React, { useEffect } from 'react';
import Button from '../Button';
import { toSeconds } from '../../time';
import { updateStats } from '../../redux/actions/stats';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const GameResults = ({ updateStats, ...props }) => {
  const history = useHistory();

  let totalTime = 0;
  for (let i=0; i<props.timePerQuestion.length; i++) {
    totalTime += props.timePerQuestion[i];
  };
  const avg = toSeconds(totalTime / props.timePerQuestion.length);

  useEffect(() => {
    const { currentScore, questionsAnswered } = props;

    console.log(props.timePerQuestion);
    
    const stats = {
      currentScore,
      questionsAnswered,
      totalTime
    };

    updateStats(stats);
  }, [props, totalTime, updateStats]);
  
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
          <td>Time/Question</td>
          <td>{ avg } secs</td>
        </tr>
        <tr>
          <td>Questions Answered</td>
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

export default connect(null, { updateStats })(GameResults)