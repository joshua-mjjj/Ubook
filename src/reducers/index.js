import { combineReducers } from "redux";

import auth from "./auth";
import errors from "./errors";
import bookings from "./bookings";
import property from "./property";
export default combineReducers({
  auth,
  errors,
  bookings,
  property,
});
