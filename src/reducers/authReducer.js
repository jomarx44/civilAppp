import { AsyncStorage } from 'react-native';
import NavigationService  from '../navigation/NavigationService';
import {
  ACCESS_TOKEN_SUCCESS, ACCESS_TOKEN_ERROR,
  LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, PIN_SUCCESS,
  PRODUCTS_SUCCESS, SIGNUP, SIGNUP_SUCCESS, SIGNUP_ERROR
} from '../actions/types';
import * as TYPE from 'actions/types';
import * as Auth from 'store/auth';
import * as Profile from 'store/profile';


export default function loginReducer(state = [], action) {
  switch (action.type) {
    case TYPE.LOGIN_ERROR:
      return action.payload;

    case TYPE.LOGIN_SUCCESS:
      console.log("login success");
      console.log(action.payload);
      Profile.setAccessData(action.payload);
      return action.payload;

    case TYPE.LOGIN_INITIAL_SUCCESS:
      console.log("login initial");
      console.log(action.payload);
      Profile.setAccessData(action.payload);
      return action.payload;

    case TYPE.OTP_CHECK_SUCCESS:
      console.log("otp check");
      console.log(action.payload);
      return action.payload;


    case TYPE.CHANGE_MENU_LOGIN:
      console.log("change: login");
      return { loggedState: 'Login' };

    case TYPE.CHECK_EMAIL_ERROR:
      return action.payload;

    case TYPE.CHECK_EMAIL_SUCCESS:
      console.log('TYPE.CHECK_EMAIL_SUCCESS');
      console.log(action.payload);
      return action.payload;

    case TYPE.SIGNUP_SUCCESS:
      console.log("signup success");
      console.log(action.payload);
 //     NavigationService.navigate('EmailVerificationScreen');
      return action.payload;

    case TYPE.OTP_SUCCESS:
      console.log("otp success");
      console.log(action.payload);
      return action.payload;

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
