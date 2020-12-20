import React, { useState, useEffect, useCallback } from 'react';
import { login } from '../redux/actions/auth';
import { clearErrors } from '../redux/actions/errors';
import { connect } from 'react-redux';
import Modal from './Modal';
import Spinner from './Spinner';
import Button from './Button';
import './Form.css';

const Login = ({ login, isAuthenticated, isLoading, error, clearErrors }) => {
  const [username, setUsername] = useState({ field: '', isFocused: false });
  const [password, setPassword] = useState({ field: '', isFocused: false });
  const [isOpen, setIsOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  
  const handleUsername = input => {
    if (input !== '') {
      setUsername({ ...username, field: input, isFocused: true });
    } else {
      setUsername({ ...username, isFocused: false });
    }
  }

  const handlePassword = input => {
    if (input !== '') {
      setPassword({ ...password, field: input, isFocused: true });
    } else {
      setPassword({ ...password, isFocused: false });
    }
  }

  const submitForm = event => {
    event.preventDefault();

    const user = { 
      username: username.field, 
      password: password.field,
    }

    login(user);
  }

  const toggleModal = useCallback(() => {
    clearErrors();

    setUsername({ ...username, isFocused: false });

    setPassword({ ...password, isFocused: false });

    setIsOpen(!isOpen);
  }, [clearErrors, username, password, isOpen])

  useEffect(() => {
    if (isAuthenticated) toggleModal()
  }, [isAuthenticated, toggleModal]);

  useEffect(() => {
    if (error.id === "LOGIN_FAILURE") setAlert(error.message.error);
    else setAlert(null);
  }, [error]);

  return (
    <React.Fragment>
      <li onClick={ () => setIsOpen(true) }>Login</li>

      <Modal isOpen={ isOpen } toggle={ toggleModal }>
        <form method="post" className="form">
          <h2>Log In</h2>
          <p>{ alert ? alert : "" }</p>
          <div className="form-field">
            <label htmlFor="name">
              <span className={`${username.isFocused ? "focus" : ""} label-text`}>Username</span>
            </label>
            <input
              type="text" 
              name="username"    
              required
              onChange={ event => handleUsername(event.target.value) }
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">
              <span className={`${password.isFocused ? "focus" : ""} label-text`}>Password</span>
            </label>
            <input 
              type="password" 
              name="password"
              required               
              onChange={ event => handlePassword(event.target.value) } 
            />
          </div>

          <Button type="submit" color="primary" handleClick={ submitForm }>
            { isLoading ? <Spinner /> : 'Log In' }
          </Button>

        </form>
      </Modal>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  error: state.errors
});

export default connect(mapStateToProps, { login, clearErrors })(Login)