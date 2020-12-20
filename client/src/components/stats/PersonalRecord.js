import React from 'react';

const PersonalRecord = ({ stats }) => {
  return (
    <table className="table responsive leaderboard">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>High Score</th>
          <th>Questions</th>
        </tr>
      </thead>
      <tbody>
      { stats.map((player, index) => (
        <tr>
          <td data-label="Rank">{ index+1 }</td>
          <td data-label="Player">{ player.username }</td>
          <td data-label="High Score">{ player.personalRecordStats.highScore }</td>
          <td data-label="Questions">{ player.personalRecordStats.questions }</td>
        </tr> )
      )}
      </tbody>
    </table>
  )
}

export default PersonalRecord