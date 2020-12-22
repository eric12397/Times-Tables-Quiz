import React from 'react';
import { logout } from '../redux/actions/auth';
import { connect } from 'react-redux';


const Logout = ({ logout }) => {
  return (
    <React.Fragment>
      <li className="list-item" onClick={ logout }>Logout</li>
    </React.Fragment>
  )
}

export default connect(null, { logout })(Logout)