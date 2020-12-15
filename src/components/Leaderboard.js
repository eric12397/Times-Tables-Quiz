import React, { useEffect } from 'react';
import './Results.css';
import Spinner from './Spinner';
import { fetchStats } from '../redux/actions/stats';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RiArrowGoBackLine } from 'react-icons/ri'; 

const Leaderboard = ({ isAuthenticated, isLoading, fetchStats, stats }) => {
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) fetchStats();
  }, [fetchStats, isAuthenticated]);

  let content;
  if (!isAuthenticated) 
    content = <Spinner />
  else if (isAuthenticated && isLoading) 
    content = <div className="message">Loading</div>
  else if (stats) 
    content = 
        <table className="table responsive leaderboard">
          <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>High Score</th>
            <th>Questions Answered</th>
            <th>Avg Time per Question</th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Rank">1</td>
              <td data-label="Player">TestUser</td>
              <td data-label="High Score">353675</td>
              <td data-label="Questions Answered">56</td>
              <td data-label="Avg Time per Question">1.678</td>
              <td></td>
            </tr> 
            <tr>
              <td data-label="Rank">2</td>
              <td data-label="Player">Navegante</td>
              <td data-label="High Score">2222</td>
              <td data-label="Questions Answered">12</td>
              <td data-label="Avg Time per Question">2.391</td>
              <td></td>
            </tr> 
         </tbody>
        </table>

  return (
    <div>
      <RiArrowGoBackLine 
        onClick={ () => history.push('/') } 
        style={{ color: '#4da9f2' }}
      />
      { content }
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  stats: state.stats.stats,
  isLoading: state.stats.isLoading
});

export default connect(mapStateToProps, { fetchStats })(Leaderboard)