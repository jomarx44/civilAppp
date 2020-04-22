import { AsyncStorage } from "react-native";
import * as NavigationService from "../navigation/NavigationService";
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
      action.payload.is_fetching = false;
      return action.payload;

    case TYPE.LOGIN_SUCCESS:
      Profile.setAccessData(action.payload);
      return action.payload;

    case TYPE.SIGNUP:
      return {
        is_fetching: true,
        success: null,
        message: "",
      };

    case TYPE.SIGNUP_SUCCESS: 
      return {
        is_fetching: false,
        success: true,
        message: action.payload.status
      };
    
    case TYPE.SIGNUP_ERROR: 
      return {
        is_fetching: false,
        success: false,
        message: action.payload.message
      };

    case TYPE.FORGOT_PASSWORD:
      return {
        is_fetching: true
      };

    case TYPE.FORGOT_PASSWORD_SUCCESS:
      return action.payload;

    case TYPE.FORGOT_PASSWORD_ERROR:
      return action.payload;

    case TYPE.USERINFO: 
      return {
        is_fetching: true
      }

    case TYPE.USERINFO_SUCCESS:
      Profile.setProfileData(action.payload);
      return {
        ...action.payload,
        action: 'USERINFO',
        is_fetching: false
      };

    case TYPE.USERINFO_ERROR: 
      
      return {
        ...action.payload,
        is_fetching: false,
        success: false
      };

    case TYPE.LOGIN_INITIAL_SUCCESS:
      Profile.setAccessData(action.payload);
      return action.payload;

    case TYPE.CHANGE_MENU_LOGIN:
      return { loggedState: "Login" };

    case TYPE.CHECK_EMAIL: 
      return {
        is_fetching: true,
        success: null,
        message: ""
      }

    case TYPE.CHECK_EMAIL_ERROR:
      return {
        ...action.payload,
        is_fetching: false,
        success: false,
        message: ""
      };

    case TYPE.CHECK_EMAIL_SUCCESS:
      return {
        ...action.payload,
        is_fetching: false,
        success: true,
        message: ""
      };

    case TYPE.RESEND_EMAIL: 
      return {
        resending: true, 
        resent: null
      }

    case TYPE.RESEND_EMAIL_SUCCESS: 
      return {
        resending: false, 
        resent: true
      }

    case TYPE.RESEND_EMAIL_ERROR: 
      return {
        resending: false, 
        resent: false
      }

    case TYPE.CHANGE_MENU_NONE:
      return { loggedState: "None" };

    case TYPE.CHANGE_MENU_PIN:
      return { loggedState: "Pin" };

    case TYPE.ACCESS_TOKEN_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
