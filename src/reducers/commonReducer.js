import { NavigationActions } from 'react-navigation';
import * as TYPE from 'actions/types';
import { ADD_SUCCESS, DELETE_SUCCESS, FETCH_SUCCESS, FETCH_ERROR } from '../actions/types';

export default function commonReducer(state = [], action) {
  switch (action.type) {
    case ADD_SUCCESS:
      return [...state, action.payload];
    case FETCH_SUCCESS:
      return action.payload;
    case TYPE.PRODUCTS_SUCCESS:
      return action.payload;
    case TYPE.APPLY_REMIT_SUCCESS:
      return action.payload;
    case FETCH_ERROR:
      return action.payload;

    default:
      return state;
  }
}
