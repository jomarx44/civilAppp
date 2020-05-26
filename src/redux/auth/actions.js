import { LOGIN, LOGIN_ERROR, LOGIN_SUCCESS } from "../actions";

import { auth } from "../../API";

export const login = (username, password) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN
    });
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

export const loginSuccess = (tokens) => ({
  type: LOGIN_SUCCESS,
  tokens,
});

export const loginError = (error) => ({
  type: LOGIN_ERROR,
  error: error,
});