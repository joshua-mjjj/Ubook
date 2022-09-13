import { 
	GET_SOCCER_BOOKINGS, 
	CREATE_BOOKING_LOADING,
	CREATED_BOOKING,
	TOOGLE,
  TOOGLE_CANCEL,
	GET_BOOKING_DETAILS,
	UPDATE_BOOKING_LOADING,
	BOOKING_UPDATED,
  GET_CLIENTS,
  CANCEL_BOOKING_LOADING,
  CANCELLED,
  GET_STATS
} from '../actions/types';

const initialState = {
  bookings: null,
  clients: null,
  system_stats: null,
  create_booking_loading: false,
  booking_created: false,
  booking_updated: false,
  booking_cancelled: false,
  booking_details_calendar: null,
  update_booking_loading: false,
  cancel_booking_loading: false
};

export default function bookings(state = initialState, action) {
  switch (action.type) {
    case GET_SOCCER_BOOKINGS:
      return {
      	 ...state,
        bookings: action.payload.results,
      };
    case GET_STATS:
      return {
         ...state,
        system_stats: action.payload,
      };
    case GET_CLIENTS:
      return {
         ...state,
        clients: action.payload.results,
      };
    case BOOKING_UPDATED:
      return {
      	 ...state,
        booking_updated: true,
        update_booking_loading: false
      };
    case UPDATE_BOOKING_LOADING:
      return {
      	 ...state,
        update_booking_loading: true,
      };
    case CANCELLED:
      return {
         ...state,
         booking_cancelled: true,
         cancel_booking_loading: false,
      };
    case CANCEL_BOOKING_LOADING:
      return {
         ...state,
        cancel_booking_loading: true,
      };
    case GET_BOOKING_DETAILS:
      return {
      	 ...state,
        booking_details_calendar: action.payload,
      };
    case CREATE_BOOKING_LOADING:
      return {
      	 ...state,
        create_booking_loading: true,
      };
    case CREATED_BOOKING:
      return {
      	 ...state,
        create_booking_loading: false,
        booking_created: true
      };
    case TOOGLE:
      return {
      	 ...state,
        create_booking_loading: false,
        booking_created: false,
        booking_updated:false,
        booking_cancelled:false,
      };
    default:
      return state;
  }
}
