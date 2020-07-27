import {
  CREATE_USER,
  FETCH_USER_INFO,
  FETCH_USER_INFO_ERROR,
  FETCH_USER_INFO_SUCCESS,
} from "../actions";

import { user } from "../../API"

/***********************
 * ACTION CREATORS
 ***********************/

export const addCreatedUser = (user) => {
  return {
    type: CREATE_USER,
    payload: {
      user,
    },
  };
};

export const getUserInfo = () => {
  return {
    type: FETCH_USER_INFO,
  };
};

export const getUserInfoSuccess = (userInfo) => {
  return {
    type: FETCH_USER_INFO_SUCCESS,
    payload: {
      userInfo,
    },
  };
};

export const getUserInfoError = (error) => {
  return {
    type: FETCH_USER_INFO_ERROR,
    error,
  };
};

/***********************
 * API WITH DISPATCH
 ***********************/

export const getUserInfoAsync = (accessToken) => {
  return dispatch => {
    dispatch(getUserInfo());
    return user.getInfo(accessToken)
      .then(({ data }) => {
        dispatch(getUserInfoSuccess(data));
      })
      .catch((error) => {
        dispatch(getUserInfoError(error))
      })
  }
}