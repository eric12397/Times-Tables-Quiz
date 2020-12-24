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
import { Tabs, Tab } from './Tabs';

const Leaderboard = ({ isAuthenticated, isLoading, fetchStats, stats, user }) => {
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) fetchStats();
  }, [fetchStats, isAuthenticated]);

  let content;

  if (!isAuthenticated) 
    content = <div className="message">Please log in to view our leaderboard</div>

  else if (isAuthenticated && isLoading) 
    content = <Spinner />

  else if (stats) 
    content = 
      <Tabs>
        <Tab label="Total">
          <Total stats={stats} authUser={ user }/>
        </Tab>
        <Tab label="Average">
          <Average stats={stats} authUser={ user }/>
        </Tab>
        <Tab label="Personal Record">
          <PersonalRecord stats={stats} authUser={ user }/>
        </Tab>
      </Tabs>

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
  isLoading: state.stats.isLoading,
  user: state.auth.user
});

export default connect(mapStateToProps, { fetchStats })(Leaderboard)