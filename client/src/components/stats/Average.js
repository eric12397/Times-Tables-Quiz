import React from 'react';
import { toSeconds } from '../../time';

const Average = ({ stats, authUser }) => {
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
        const scorePerGame = player.totalStats.score / player.totalStats.gamesPlayed || 0;
        const questionsPerGame = player.totalStats.questions / player.totalStats.gamesPlayed || 0;
        const timePerQuestion = player.totalStats.timePlayed/player.totalStats.questions || 0;

        return (
        <tr className={`${player.username === authUser.username ? "user" : ""}`}>
          <td data-label="Rank">{ index+1 }</td>
          <td data-label="Player">{ player.username }</td>
          <td data-label="Score/Game">
            { (scorePerGame).toFixed(2) }
          </td>
          <td data-label="Questions/Game">
            { (questionsPerGame).toFixed(2) }
          </td>
          <td data-label="Time/Question">
            { toSeconds(timePerQuestion) + " sec" }
          </td>
        </tr> )
      })}
        
      </tbody>
    </table>
  )
}

export default Average