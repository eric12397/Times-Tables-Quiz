import React from 'react';
import { toHrMinSec } from '../../time';

const Total = ({ stats, authUser }) => {
  return (
    <table className="table responsive leaderboard">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Score</th>
          <th>Questions</th>
          <th>Games Played</th>
          <th>Time Played</th>
        </tr>
      </thead>
      <tbody>
      { stats.map((player, index) => (
        <tr className={`${player.username === authUser.username ? "user" : ""}`}>
          <td data-label="Rank">{ index+1 }</td>
          <td data-label="Player">{ player.username }</td>
          <td data-label="Score">{ player.totalStats.score }</td>
          <td data-label="Questions">{ player.totalStats.questions }</td>
          <td data-label="Games Played">{ player.totalStats.gamesPlayed }</td>
          <td data-label="Time Played">{ toHrMinSec(player.totalStats.timePlayed) }</td>
        </tr> )
      )}
      </tbody>
    </table>
  )
}

export default Total