import './Navbar.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import Fade from './Fade';

const Navbar = ({ isAuthenticated, user }) => {
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
      <span>View Leaderboard</span>
      <Logout />
    </React.Fragment>
  )

  return (
    <nav className="navbar">
      <div className="title">
        <span>Times Table Trials</span>
      </div>

      <div className="navbar-right">
        <Fade in={ isAuthenticated }>
          <span>{ welcome }</span>
        </Fade>
        { isAuthenticated ? userLinks : guestLinks }
      </div>
    </nav>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, null)(Navbar)