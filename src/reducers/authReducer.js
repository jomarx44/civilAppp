import { AsyncStorage } from "react-native";
import NavigationService from "../navigation/NavigationService";
import {
  ACCESS_TOKEN_SUCCESS,
  ACCESS_TOKEN_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  PIN_SUCCESS,
  PRODUCTS_SUCCESS,
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from "../actions/types";
import * as TYPE from "../actions/types";
import * as Auth from "store/auth";
import * as Profile from "store/profile";

export default function loginReducer(state = [], action) {
  switch (action.type) {
    case TYPE.LOGIN:
      return {
        is_fetching: true
      };
    case TYPE.LOGIN_ERROR:
      // console.log('Login Error: ', action.payload);
      action.payload.is_fetching = false;
      return action.payload;

    case TYPE.LOGIN_SUCCESS:
        console.log("Login Success: ", action.payload);
      Profile.setAccessData(action.payload);
      return action.payload;

    case TYPE.FORGOT_PASSWORD:
      return {
        is_fetching: true
      }
    
    case TYPE.FORGOT_PASSWORD_SUCCESS:
      console.log('FORGOT PASSWORD SUCCESS: ', action.payload) 
      return action.payload;

    case TYPE.FORGOT_PASSWORD_ERROR:
        console.log('FORGOT PASSWORD ERROR: ', action.payload) 
      return action.payload;

    case TYPE.USERINFO_SUCCESS:
      console.log('User Info: ', action.payload)
      Profile.setProfileData(action.payload);
      return action.payload;

    case TYPE.LOGIN_INITIAL_SUCCESS:
      Profile.setAccessData(action.payload);
      return action.payload;

    case TYPE.CHANGE_MENU_LOGIN:
      return { loggedState: "Login" };

    case TYPE.CHECK_EMAIL_ERROR:
      return action.payload;

    case TYPE.CHECK_EMAIL_SUCCESS:
      return action.payload;

    case TYPE.SIGNUP_SUCCESS:
      //     NavigationService.navigate('EmailVerificationScreen');
      return action.payload;

    case TYPE.CHANGE_MENU_NONE:
      return { loggedState: "None" };

    case TYPE.CHANGE_MENU_PIN:
      return { loggedState: "Pin" };

    case ACCESS_TOKEN_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
