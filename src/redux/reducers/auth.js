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
} from '../actions/types';

const initialState = {
  user: '',
  jwt: localStorage.getItem('jwt'),
  isAuthenticated: false,
  isLoading: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case LOAD_USER_PENDING:
    case LOGIN_PENDING:
    case REGISTER_PENDING:
      return {
        ...state,
        isLoading: true
      };

    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('jwt', action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        jwt: action.payload.token,
        isAuthenticated: true,
        isLoading: false
      };

    case LOAD_USER_FAILURE:
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case LOGOUT_SUCCESS:
      localStorage.removeItem('jwt');
      return {
        ...state,
        user: '', 
        jwt: null,
        isAuthenticated: false,
        isLoading: false
      };

    default:
      return state
  }
}