import React from 'React';
import { Alert } from 'react-native'
import { Toast } from 'native-base';
import axios from 'axios';
import querystring from 'querystring';
import Constants from 'expo-constants';
import { getMethod, postMethod, getMethodWithToken, postMethodWithToken, postMethodWithTokenApply, putMethod, putMethodWithToken,dispatchOnly } from './axiosCalls';
import * as TYPE from './types';
import * as Auth from 'store/auth';
import moment from 'moment';

class Api  {

  token = null;
  static instance = null;
  static getInstance () {
    if (Api.instance == null) {
      Api.instance = new Api();
    }
    return this.instance;
  }

  setToken (token ) {
    this.token(token);
  }


  loginInitial ( username, password ) {
    const json_data = {
      path: "manage",
      reducer_type: TYPE.LOGIN_INITIAL,
      params: {
        action: 'signin',
        username: username,
        password: password
      }
    }
    return postMethod(json_data);
  }


  login ( username, password ) {
    const json_data = {
      path: "manage",
      reducer_type: TYPE.LOGIN, 
      params: {
        action: 'signin',
        username: username,
        password: password
      }
    }
    return postMethod(json_data);
  }

  checkEmail ( userId ) {
    const json_data = {
      path: "manage",
      reducer_type: TYPE.CHECK_EMAIL, 
      params: {
        action: 'isEmailVerified',
        userid: userId
      }
    }
    return postMethod(json_data);
  }



  signup ( userdata ) {
    const json_data = {
      path: "manage",
      reducer_type: TYPE.SIGNUP, 
      params: {
        action: 'signup',
        email: userdata.email,
        password: userdata.password,
        givenName: userdata.givenName,
        middleName: userdata.middleName,
        familyName: userdata.familyName,
        phoneNumber: userdata.phoneNumber
      }
    }
    return postMethod(json_data);
  }

  sendOTP ( token, phoneNumber ) {
    const json_data = {
      path: "manage",
      reducer_type: TYPE.OTP, 
      params: {
        action: 'send_otp',
        access_token: token,
        phone_number: phoneNumber
      }
    }
    return postMethod(json_data);
  }


  isOTPCorrect ( token, otp ) {
    const json_data = {
      path: "manage",
      reducer_type: TYPE.OTP_CHECK, 
      params: {
        action: 'isOTPCorrect',
        access_token: token,
        otp: otp
      }
    }
    return postMethod(json_data);
  }


}

var instance = Api.getInstance();
module.exports = instance;

