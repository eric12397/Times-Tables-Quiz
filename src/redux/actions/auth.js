import axios from 'axios';
import jwtConfig from '../jwtConfig';
import { getErrors } from './errors';
import { 
  LOAD_USER_PENDING,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT_SUCCESS,
} from './types';

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: LOAD_USER_PENDING });

  axios
    .get('http://localhost:5000/api/auth/user', jwtConfig(getState))
    .then(response => 
      dispatch({ 
        type: LOAD_USER_SUCCESS, 
        payload: response.data 
      })
    )
    .catch(error => {
      dispatch({ type: LOAD_USER_FAILURE });
      dispatch(getErrors(error.response.data, error.response.status, LOAD_USER_FAILURE))
    })
}

export const login = user => dispatch => {
  dispatch({ type: LOGIN_PENDING });

  const { username, password } = user;
  const body = JSON.stringify({ username, password });

  axios
    .post('http://localhost:5000/api/auth/login', body, publicConfig())
    .then(response => 
      dispatch({ 
        type: LOGIN_SUCCESS, 
        payload: response.data 
      })
    )
    .catch(error => {
      dispatch({ type: LOGIN_FAILURE });
      dispatch(getErrors(error.response.data, error.response.status, LOGIN_FAILURE))
    })
}

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT_SUCCESS })
}

export const register = user => dispatch => {
  dispatch({ type: REGISTER_PENDING });

  const { username, password } = user;
  const body = JSON.stringify({ username, password });

  axios
    .post('http://localhost:5000/api/auth/register', body, publicConfig())
    .then(response => 
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data
      })
    )
    .catch(error => {
      dispatch({ type: REGISTER_FAILURE });
      dispatch(getErrors(error.response.data, error.response.status, REGISTER_FAILURE))
    })
}

const publicConfig = () => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return config
};