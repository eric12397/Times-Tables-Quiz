import { combineReducers } from 'redux';
import auth from './auth';
import stats from './stats';
import errors from './errors';

export default combineReducers({
  auth,
  stats,
  errors
})