import { GET_ERRORS, CLEAR_ERRORS } from './types';

// RETURN ERRORS
// takes in status code for now, may be more parameters in future
export const returnError = (msg, status) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status }
  };
};

export const clear_state_error = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  });
};