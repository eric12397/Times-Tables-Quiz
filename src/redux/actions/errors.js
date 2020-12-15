import { GET_ERRORS, CLEAR_ERRORS } from './types';

export const getErrors = (data, status, id=null) => {
  return { 
    type: GET_ERRORS,
    payload: { data, status, id }
  }
}

export const clearErrors = () => {
  return { type: CLEAR_ERRORS }
}