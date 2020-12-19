import React from 'react';
import { toSeconds } from '../../time';

const Average = ({ stats }) => {
  return (
    <table className="table responsive leaderboard">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Score/Game</th>
          <th>Questions/Game</th>
          <th>Time/Question</th>
        </tr>
      </thead>
      <tbody>
      { stats.map((player, index) => {
        return (
        <tr>
          <td data-label="Rank">{ index+1 }</td>
          <td data-label="Player">{ player.username }</td>
          <td data-label="Score/Game">
            { (player.totalStats.score/player.totalStats.gamesPlayed).toFixed(2) }
          </td>
          <td data-label="Questions/Game">
            { (player.totalStats.questions/player.totalStats.gamesPlayed).toFixed(2) }
          </td>
          <td data-label="Time/Question">
            { toSeconds(player.totalStats.timePlayed/player.totalStats.questions) + " sec" }
          </td>
        </tr> )
      })}
        
      </tbody>
    </table>
  )
}

export default Average