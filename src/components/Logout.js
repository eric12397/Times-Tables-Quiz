import React from 'react';
import { logout } from '../redux/actions/auth';
import { connect } from 'react-redux';


const Logout = ({ logout }) => {
  return (
    <React.Fragment>
      <span onClick={ logout }>Logout</span>
    </React.Fragment>
  )
}

export default connect(null, { logout })(Logout)