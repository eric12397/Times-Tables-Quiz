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
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isAuthenticated) setWelcome(`Welcome ${user.username}`);
  }, [isAuthenticated, user]);

  const guestLinks = (
    <React.Fragment>
      <Login />
      <Register />
    </React.Fragment>
  )

  const userLinks = (
    <React.Fragment>
      <li className="list-item" onClick={ () => history.push('/leaderboard') }>View Leaderboard</li>
      <Logout />
    </React.Fragment>
  )

  return (
    <nav className="navbar">
      <ul className={`${isOpen ? 'show' : 'hide'}`}>
        <li className="title">Times Table Trials</li>
        
        <Fade in={ isAuthenticated } className="welcome">
          <li className="list-item">{welcome}</li>
        </Fade>

        { isAuthenticated ? userLinks : guestLinks }

        <li className="hamburger-btn" onClick={ toggleMenu }>
          <i class="fas fa-bars"></i>
        </li>
      </ul>
    </nav>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, null)(Navbar)