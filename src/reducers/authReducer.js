import { AsyncStorage } from 'react-native';
import NavigationService  from '../navigation/NavigationService';
import {
  ACCESS_TOKEN_SUCCESS, ACCESS_TOKEN_ERROR,
  LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, PIN_SUCCESS,
  PRODUCTS_SUCCESS
} from '../actions/types';
import * as TYPE from 'actions/types';
import * as Auth from 'store/auth';
import * as Profile from 'store/profile';


export default function loginReducer(state = [], action) {
  switch (action.type) {
    case TYPE.LOGIN_ERROR:
      return action.payload;
    case TYPE.CHANGE_MENU_LOGIN:
      console.log("change: login");
      return { loggedState: 'Login' };
    case TYPE.CHANGE_MENU_NONE:
      console.log("change: none");
      return { loggedState: 'None' };
    case TYPE.CHANGE_MENU_PIN:
      console.log("change: pin");
      return { loggedState: 'Pin' };
    case ACCESS_TOKEN_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
