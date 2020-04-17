import { Alert } from "react-native";
import { Toast } from "native-base";
import axios from "axios";
import querystring from "querystring";
import Constants from "expo-constants";
import * as TYPE from "./types";
import * as Auth from "store/auth";
import * as PROFILE from "../store/profile";
import moment from "moment";
import AppJson from "../../app.json";
import * as NavigationService from "navigation/NavigationService.js";

class IBMAppId {
  token = null;

  static instance = null;
  static axios_obj = null;

  static getInstance() {
    if (IBMAppId.instance == null) {
      IBMAppId.instance = new IBMAppId();
    }
    return this.instance;
  }

  constructor() {
    this.axios_obj = axios.create({
      baseURL: AppJson.appid.APPID_AUTH_SERVER_HOST
    });
  }

  responseData = (data, type, params) => {
    return {
      type: type,
      payload: data,
      params: params
    };
  };

  /*********************************
   *
   * HTTP LIBRARY CALLS
   *
   **********************************/

  getMethodWithToken = (json, navigation) => {
    let token = json["token"];
    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*"
    };
    const config = {
      headers: headers
    };

    return this.axios_obj.get(json["path"], config);
  };

  // API CALLS
  getUserInfo(token) {
    const _url = "/oauth/v4/" + AppJson.appid.IBM_TENANT_ID + "/userinfo";
    const json_data = {
      token: token,
      path: _url
    };
    return dispatch => {
      dispatch({
        type: TYPE.FETCH_PROFILE
      });
      return this.getMethodWithToken(json_data)
        .then(({data: {identities, sub}}) => {
          if (identities && identities.length > 0) {
            const {
              displayName,
              emails,
              id,
              name: { givenName, middleName, familyName },
              phoneNumbers
            } = identities[0].idpUserInfo;
            console.log("identities[0].idpUserInfo: ", identities[0].idpUserInfo)
            const payload = {
              id,
              sub,
              emails,
              phoneNumbers,
              name: {
                displayName,
                givenName,
                middleName,
                familyName
              }
            };
            dispatch({
              type: TYPE.FETCH_PROFILE_SUCCESS,
              payload
            });
          } else {
            dispatch({
              type: TYPE.FETCH_PROFILE_ERROR,
              payload: {
                message: "Not yet registered."
              }
            });
            alert("It seems that you are not yet registered.");
          }
        })
        .catch(error => {
          dispatch({
            type: TYPE.FETCH_PROFILE_ERROR,
            payload: {
              message: error
            }
          });
          console.log("Error has occured: ", error);
          alert("No internet connection. Please try again.");
        });
    };
  }
}

var instance = IBMAppId.getInstance();
module.exports = instance;
