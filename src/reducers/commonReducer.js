import * as TYPE from 'actions/types';
import { ADD_SUCCESS, DELETE_SUCCESS, FETCH,  FETCH_SUCCESS, FETCH_ERROR } from '../actions/types';

export default function commonReducer(state = [], action) {
  switch (action.type) {
    case ADD_SUCCESS:
      return [...state, action.payload];
    case TYPE.PRODUCTS_SUCCESS:
      return action.payload;
    case TYPE.APPLY_REMIT_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
