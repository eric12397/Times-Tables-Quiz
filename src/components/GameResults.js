import './Results.css';
import React from 'react';
import Button from './Button';

const GameResults = props => {

  return (
    <React.Fragment>
      <table className="results-table">
        <tr>
          <td>Your High Score</td>
          <td>{ props.highScore }</td>
        </tr>
        <tr>
          <td>Average Time per Question</td>
          <td>3.29 secs</td>
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