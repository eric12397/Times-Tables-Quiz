import {
  FETCH_STATS_PENDING,
  FETCH_STATS_SUCCESS,
  FETCH_STATS_FAILURE,
  UPDATE_STATS_PENDING,
  UPDATE_STATS_SUCCESS,
  UPDATE_STATS_FAILURE,
} from '../actions/types'

const initialState = {
  stats: [],
  isLoading: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_STATS_PENDING:
      return {
        ...state,
        isLoading: true
       };

    case FETCH_STATS_SUCCESS: 
      return {
        ...state,
        stats: [ ...action.payload ],
        isLoading: false
      };

    case FETCH_STATS_FAILURE:
      return {
        ...state, 
        stats: [],
        isLoading: false
      }

    default:
      return state
  }
}