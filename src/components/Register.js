import React, { useState, useEffect, useCallback } from 'react';
import { register } from '../redux/actions/auth';
import { clearErrors } from '../redux/actions/errors';
import { connect } from 'react-redux';
import Modal from './Modal';
import Spinner from './Spinner';
import Button from './Button';
import './Form.css';

const Register = ({ register, isAuthenticated, isLoading, error, clearErrors }) => {
  const [username, setUsername] = useState({ field: '', isFocused: false });
  const [password1, setPassword1] = useState({ field: '', isFocused: false });
  const [password2, setPassword2] = useState({ field: '', isFocused: false });
  const [isOpen, setIsOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  
  const handleUsername = input => {
    if (input !== '') {
      setUsername({ ...username, field: input, isFocused: true });
    } else {
      setUsername({ ...username, isFocused: false });
    }
  }

  const handlePassword1 = input => {
    if (input !== '') {
      setPassword1({ ...password1, field: input, isFocused: true });
    } else {
      setPassword1({ ...password1, isFocused: false });
    }
  }

  const handlePassword2 = input => {
    if (input !== '') {
      setPassword2({ ...password2, field: input, isFocused: true });
    } else {
      setPassword2({ ...password2, isFocused: false });
    }
  }

  const submitForm = event => {
    event.preventDefault();
    
    if (password1.field && password2.field && password1.field === password2.field) {
      const user = { 
        username: username.field, 
        password: password1.field, 
      }
      register(user);
    } else if (!username.field || !password1.field || !password2.field) {
      setAlert('Please enter username and passwords')
    } else {
      setAlert('Passwords must match!')
    }
  }

  const toggleModal = useCallback(() => {
    clearErrors();

    setUsername({ ...username, isFocused: false });

    setPassword1({ ...password1, isFocused: false });

    setPassword2({ ...password2, isFocused: false });

    setIsOpen(!isOpen);
  }, [clearErrors, username, password1, password2, isOpen])

  useEffect(() => {
    if (isAuthenticated) toggleModal()
  }, [isAuthenticated, toggleModal]);

  useEffect(() => {
    if (error.id === "REGISTER_FAILURE") setAlert(error.message.error);
    else setAlert(null);
  }, [error]);


  return (
    <React.Fragment>
      <span onClick={ toggleModal }>Register for a new account</span>

      <Modal isOpen={ isOpen } toggle={ toggleModal }>      
        <form method="post" className="form" onSubmit={ submitForm }>    
          <h2>Register</h2>
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
            <label htmlFor="password1">
              <span className={`${password1.isFocused ? "focus" : ""} label-text`}>Password</span>
            </label>
            <input 
              type="password" 
              name="password1" 
              required               
              onChange={ event => handlePassword1(event.target.value) } 
            />
          </div>

          <div className="form-field">
            <label htmlFor="password2">
              <span className={`${password2.isFocused ? "focus" : ""} label-text`}>Confirm Password</span>
            </label>
            <input 
              type="password" 
              name="password2" 
              required               
              onChange={ event => handlePassword2(event.target.value) } 
            />
          </div>

          <Button color="primary" type="submit" handleClick={ submitForm }>
            { isLoading ? <Spinner /> : 'Sign Up' }
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

export default connect(mapStateToProps, { register, clearErrors })(Register)