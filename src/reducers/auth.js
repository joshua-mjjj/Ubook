import {
  LOGIN_SUCCESS,
  LOGIN_LOADING,
  //  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CREATE_MESSAGE_SUCCESS,
  CLEAR_ERRORS_SUCCESS,
  CLEAR_MESSAGES_SUCCESS,
  // CHANGE_PASSWORD_LOADING,
  // CHANGE_PASSWORD_SUCCESS,
  // CHANGE_PASSWORD_FAIL,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  login_loading: false,
  register_loading: false,
  register_success: false,
  user: null,
  message: null,
  reason: null,
  // change_password_loading: false,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    // case CHANGE_PASSWORD_LOADING:
    //   return {
    //     ...state,
    //     change_password_loading: true
    //   };
    // case CHANGE_PASSWORD_SUCCESS:
    // case CHANGE_PASSWORD_FAIL:
    //   return {
    //     ...state,
    //     change_password_loading: false
    //   };
    case LOGIN_LOADING:
      return {
        ...state,
        login_loading: true,
      };
    case REGISTER_LOADING:
      return {
        ...state,
        register_loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        register_success: true,
        register_loading: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        register_success: false,
        register_loading: false,
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        login_loading: false,
      };
    case LOGIN_FAIL:
    //  case LOGOUT_SUCCESS:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        login_loading: false,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };

    //handle messages
    case CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        message: action.payload,
        reason: action.reason,
      };

    case CLEAR_ERRORS_SUCCESS:
      return {
        ...state,
        error: null,
      };

    case CLEAR_MESSAGES_SUCCESS:
      return {
        ...state,
        message: null,
        reason: null,
      };
    default:
      return state;
  }
}
