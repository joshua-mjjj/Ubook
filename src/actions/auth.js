import axios from "axios";
import { returnError } from "./errors";
// import { createMessage, create_api_message } from './messages';

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_LOADING,
  // LOGOUT_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS_SUCCESS,
  CREATE_MESSAGE_SUCCESS,
  CLEAR_MESSAGES_SUCCESS,
  // CHANGE_PASSWORD_LOADING,
  // CHANGE_PASSWORD_SUCCESS,
  // CHANGE_PASSWORD_FAIL
} from "./types";

// export const global_url = process.env.REACT_APP_API_URL;
export const global_url = "http://ubook-api.herokuapp.com/source";
// export const global_url_local = 'https://vippu-api.herokuapp.com'

//  LOGIN
export const login = (username, password) => (dispatch) => {
  //Loading
  dispatch({ type: LOGIN_LOADING });

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // Request Body
  const body = JSON.stringify({ username, password });

  axios
    .post(`${global_url}/login/`, body, config)
    .then((res) => {
      // console.log(res.data)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnError(err.response.data, null));
      console.log(err.response.data);
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

//  REGISTER
export const register = (data) => (dispatch) => {
  //Loading
  dispatch({ type: REGISTER_LOADING });

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post(`${global_url}/signup/`, data, config)
    .then((res) => {
      // console.log(res.data)
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnError(err.response.data, null));
      console.log(err.response.data);
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// LOAD USER
export const loadUser = () => (dispatch, getState) => {
  axios
    .get(`${global_url}/users/me/`, tokenConfig(getState))

    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // if token, add to headers in config
  if (token) {
    config.headers["Authorization"] = `JWT ${token}`;
  }
  return config;
};

//clear errors
export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS_SUCCESS,
  });
};

export const createMessage = (msg, reason) => (dispatch) => {
  dispatch({
    type: CREATE_MESSAGE_SUCCESS,
    payload: msg,
    reason: reason,
  });
};

export const clearMessage = () => (dispatch) => {
  dispatch({
    type: CLEAR_MESSAGES_SUCCESS,
  });
};
