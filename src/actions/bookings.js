import axios from 'axios';

import {
  GET_SOCCER_BOOKINGS,
  CREATE_BOOKING_LOADING,
  CREATED_BOOKING,
  TOOGLE,
  GET_BOOKING_DETAILS,
  UPDATE_BOOKING_LOADING,
  BOOKING_UPDATED,
  GET_CLIENTS,
  CANCEL_BOOKING_LOADING,
  CANCELLED,
  GET_STATS
} from './types';

import { tokenConfig } from './auth'
// export const global_url = 'http://127.0.0.1:8000/source' 
export const global_url = 'https://fast-sports-fusion-api.herokuapp.com/source' 

export const get_bookings = () => (dispatch, getState) => {

  axios
    .get(`${global_url}/booking/`)
    .then((res) => {
      // console.log(res.data)
      dispatch({
        type: GET_SOCCER_BOOKINGS,
        payload: res.data
      });
    })
    .catch((err) => {
      console.log(err.response)
      // dispatch({
      //   type: AUTH_ERROR
      // });
    });
};

export const get_stats = () => (dispatch, getState) => {

  axios
    .get(`${global_url}/stats/`, tokenConfig(getState))
    .then((res) => {
      // console.log(res.data)
      dispatch({
        type: GET_STATS,
        payload: res.data
      });
    })
    .catch((err) => {
      console.log(err.response)
      // dispatch({
      //   type: AUTH_ERROR
      // });
    });
};

export const get_clients = () => (dispatch, getState) => {

  axios
    .get(`${global_url}/clients/`, tokenConfig(getState))
    .then((res) => {
      // console.log(res.data)
      dispatch({
        type: GET_CLIENTS,
        payload: res.data
      });
    })
    .catch((err) => {
      console.log(err.response)
      // dispatch({
      //   type: AUTH_ERROR
      // });
    });
};

export const cancel_booking = (data, id) => (dispatch, getState) => {
   dispatch({ type: CANCEL_BOOKING_LOADING  });
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  axios
    .patch(`${global_url}/booking/${id}/`, data, config)
    .then((res) => {
      // console.log(res.data.id)
      dispatch({
        type: CANCELLED,
        payload: res.data
      });
    })
    .catch((err) => {
      console.log(err.response)
      // dispatch({
      //   type: AUTH_ERROR
      // });
    });
};

export const update_booking = (data, id) => (dispatch, getState) => {
   dispatch({ type: UPDATE_BOOKING_LOADING  });
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  axios
    .patch(`${global_url}/booking/${id}/`, data, config)
    .then((res) => {
      // console.log(res.data.id)
      dispatch({
        type: BOOKING_UPDATED,
        payload: res.data
      });
    })
    .catch((err) => {
      console.log(err.response)
      // dispatch({
      //   type: AUTH_ERROR
      // });
    });
};

export const get_booking_details = (id) => (dispatch, getState) => {

  axios
    .get(`${global_url}/booking/${id}`)
    .then((res) => {
      // console.log(res.data.id)
      dispatch({
        type: GET_BOOKING_DETAILS,
        payload: res.data
      });
    })
    .catch((err) => {
      console.log(err.response)
      // dispatch({
      //   type: AUTH_ERROR
      // });
    });
};

export const toggle_back = () => (dispatch, getState) => {
	dispatch({ type: TOOGLE  });
}

export const create_booking = (data) => (dispatch, getState) => {
  dispatch({ type: CREATE_BOOKING_LOADING  });

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  console.log(data)
  axios
    .post(`${global_url}/booking/`, data, config)
    .then((res) => {
      console.log(res)
      dispatch({
        type: CREATED_BOOKING,
        payload: res.data
      });
    })
    .catch((err) => {
      console.log(err.response)
      // dispatch({
      //   type: AUTH_ERROR
      // });
    });
};