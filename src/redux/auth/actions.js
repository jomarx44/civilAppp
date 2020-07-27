import {
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../actions";
import { auth, user } from "../../API";

/***********************
 * ACTION CREATORS
 ***********************/

export const login = () => ({
  type: LOGIN,
});

export const loginSuccess = (tokens) => ({
  type: LOGIN_SUCCESS,
  payload: {
    tokens,
  },
});

export const loginError = (error) => ({
  type: LOGIN_ERROR,
  error,
});

export const logout = () => ({
  type: LOGOUT,
});

/***********************
 * API WITH DISPATCH
 ***********************/

export const loginAsync = (username, password) => {
  return (dispatch) => {
    dispatch(login());
    return auth
      .signin(username, password)
      .then(
        ({
          data: {
            success,
            message,
            access_token: accessToken,
            id_token: idToken,
            refresh_token: refreshToken,
          },
        }) => {
          if (success) {
            dispatch(
              loginSuccess({
                accessToken,
                idToken,
                refreshToken,
              })
            );
          } else {
            dispatch(loginError(message));
          }
        }
      )
      .catch((error) => {
        dispatch(loginError(error));
      });
  };
};
