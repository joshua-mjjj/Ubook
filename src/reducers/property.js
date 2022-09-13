import { actionTypes } from "../actions/propertyTypes";

const initialState = {
  create_loading: false,
  get_loading: false,
  update_loading: false,
  delete_loading: false,
  properties: [],
  error: null,
};
export default function property(state = initialState, action) {
  switch (action.type) {
    //get properties
    case actionTypes.GET_PROPERTIES_LOADING:
      return {
        get_loading: true,
      };
    case actionTypes.GET_PROPERTIES_SUCCESS:
      return {
        properties: action.payload,
        get_loading: false,
      };
    case actionTypes.GET_PROPERTIES_FAIL:
      return {
        get_loading: false,
        error: action.payload,
      };

    //create properties
    case actionTypes.CREATE_PROPERTIES_LOADING:
      return {
        create_loading: true,
      };
    case actionTypes.CREATE_PROPERTIES_SUCCESS:
      return {
        properties: [...state.properties, action.payload],
        create_loading: false,
      };
    case actionTypes.CREATE_PROPERTIES_FAIL:
      return {
        create_loading: false,
        error: action.payload,
      };

    //update properties
    case actionTypes.UPDATE_PROPERTIES_LOADING:
      return {
        update_loading: true,
      };
    case actionTypes.UPDATE_PROPERTIES_SUCCESS:
      return {
        properties: state.properties.map((property) =>
          property.id === action.payload.id ? action.payload : property
        ),
        update_loading: false,
      };
    case actionTypes.UPDATE_PROPERTIES_FAIL:
      return {
        update_loading: false,
        error: action.payload,
      };

    //delete properties
    case actionTypes.DELETE_PROPERTIES_LOADING:
      return {
        delete_loading: true,
      };
    case actionTypes.DELETE_PROPERTIES_SUCCESS:
      return {
        properties: state.properties.filter(
          (property) => property.id !== action.payload
        ),
        delete_loading: false,
      };
    case actionTypes.DELETE_PROPERTIES_FAIL:
      return {
        delete_loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
