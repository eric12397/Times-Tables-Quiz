import './stats/Table.css';
import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import Total from './stats/Total';
import Average from './stats/Average';
import PersonalRecord from './stats/PersonalRecord';
import { fetchStats } from '../redux/actions/stats';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RiArrowGoBackLine } from 'react-icons/ri'; 

const Leaderboard = ({ isAuthenticated, isLoading, fetchStats, stats }) => {
  const history = useHistory();
  const [show, setShow] = useState({ 
    total: true, average: false, personal: false 
  })

  const showTotal = () => setShow({ ...show, total: true, average: false, personal: false });

  const showAverage = () => setShow({ ...show, total: false, average: true, personal: false });

  const showPersonalRecord = () => setShow({ ...show, total: false, average: false, personal: true });

  useEffect(() => {
    if (isAuthenticated) fetchStats();
  }, [fetchStats, isAuthenticated]);

  let content;

  if (!isAuthenticated) 
    content = <div className="message">Please log in to view our leaderboard</div>

  else if (isAuthenticated && isLoading) 
    content = <Spinner />

  else if (stats && show.total) 
    content = <Total stats={ stats }/>
      
  else if (stats && show.average)
    content = <Average stats={ stats }/>
  
  else if (stats && show.personal)
    content = <PersonalRecord stats={ stats }/>
      
  return (
    <div>
      <RiArrowGoBackLine 
        onClick={ () => history.push('/') } 
        style={{ color: '#4da9f2' }}
      />
      { isAuthenticated ? 
        <div>
          <button onClick={ showTotal }>
            Total
          </button>
          <button onClick={ showAverage }>
            Average
          </button>
          <button onClick={ showPersonalRecord }>
            Personal Record
          </button>
        </div> : "" }
      
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