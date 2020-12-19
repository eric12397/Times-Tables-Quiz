import axios from 'axios';
import jwtConfig from '../jwtConfig';
import { getErrors } from './errors'
import {
  FETCH_STATS_PENDING,
  FETCH_STATS_SUCCESS,
  FETCH_STATS_FAILURE,
  UPDATE_STATS_PENDING,
  UPDATE_STATS_SUCCESS,
  UPDATE_STATS_FAILURE,
} from './types'

export const fetchStats = () => (dispatch, getState) => {
  dispatch({ type: FETCH_STATS_PENDING });

  axios
    .get('http://localhost:5000/api/users', jwtConfig(getState))
    .then(response => 
      dispatch({ 
        type: FETCH_STATS_SUCCESS,
        payload: response.data
      })
    )
    .catch(error => {
      dispatch({ type: FETCH_STATS_FAILURE });
      dispatch(getErrors(error.response.data, error.response.status, FETCH_STATS_FAILURE))
    })
}

export const updateStats = stats => (dispatch, getState) => {
  dispatch({ type: UPDATE_STATS_PENDING });

  const id = getState().auth.user._id;
  const body = JSON.stringify(stats);

  axios
    .post(`http://localhost:5000/api/users/${id}/stats`, body, jwtConfig(getState))
    .then(response => 
      dispatch({ 
        type: UPDATE_STATS_SUCCESS,
        payload: response.data
      })
    )
    .catch(error => {
      dispatch({ type: UPDATE_STATS_FAILURE });
      dispatch(getErrors(error.response.data, error.response.status, UPDATE_STATS_FAILURE))
    })
}