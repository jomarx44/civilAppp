import {
  ADD_ATTRIBUTES,
  FETCH_ATTRIBUTES,
  FETCH_ATTRIBUTES_SUCCESS,
  FETCH_ATTRIBUTES_ERROR,
  PUT_ATTRIBUTES,
  PUT_ATTRIBUTES_SUCCESS,
  PUT_ATTRIBUTES_ERROR,
  REQUEST_ID,
  REQUEST_ID_SUCCESS,
  REQUEST_ID_ERROR
} from "./AppAttribute_actions";

import {alertBox} from "../../actions/axiosCalls"

const initialState = {
  isFetching: false,
  isSaving: false,
  isUpdating: false,
  success: true,
  message: "",
  attributes: {},
  temporary_key: null,
  temporary_attributes: {}
};

export const AppAttributeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ATTRIBUTES: 
      return {
        ...state,
        temporary_attributes: {
          ...state.temporary_attributes,
          ...action.attributes
        }
      };

    case REQUEST_ID:
      return {
        ...state,
        isSaving: true
      };
      
    case REQUEST_ID_SUCCESS:
      console.log('REQUEST_ID_SUCCESS');
      return {
        ...state,
        temporary_key: action.payload,
        isSaving: false
      }

    case REQUEST_ID_ERROR:
      return {
        ...state,
        isSaving: false
      };

    case FETCH_ATTRIBUTES_ERROR:
      return {
        ...state,
        isFetching: false
      };

    case FETCH_ATTRIBUTES_SUCCESS:
      console.log("Action payload: ", action.payload);
      return {
        ...state,
        isFetching: false,
        attributes: {
          ...state.attributes,
          ...action.payload.attribute
        }
      };

    case FETCH_ATTRIBUTES:
      return {
        ...state,
        isFetching: true
      }

    case FETCH_ATTRIBUTES_ERROR:
      return action.payload;

    case FETCH_ATTRIBUTES_SUCCESS:
      return action.payload;

    case PUT_ATTRIBUTES:
      return Object.assign({}, state, {
        ...state,
        isUpdating: true
      });

    case PUT_ATTRIBUTES_ERROR:
      return {
        ...state,
        isFetching: false,
        success: false
      };

    case PUT_ATTRIBUTES_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}