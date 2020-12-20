import './Navbar.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import Fade from './Fade';

const Navbar = ({ isAuthenticated, user }) => {
  const history = useHistory();
  const [welcome, setWelcome] = useState(null);

  useEffect(() => {
    if (isAuthenticated) setWelcome(`Welcome ${user.username}`);
    else setWelcome(null);
  }, [isAuthenticated, user]);

  const guestLinks = (
    <React.Fragment>
      <Login />
      <Register />
    </React.Fragment>
  )

  const userLinks = (
    <React.Fragment>
      <li onClick={ () => history.push('/leaderboard') }>View Leaderboard</li>
      <Logout />
    </React.Fragment>
  )

  return (
    <nav className="navbar">
      <span className="title">Times Table Trials</span>
      
      <ul className="navbar-right">
        <Fade in={ isAuthenticated }><li>{ welcome }</li></Fade>
        { isAuthenticated ? userLinks : guestLinks }
      </ul>
    </nav>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, null)(Navbar)