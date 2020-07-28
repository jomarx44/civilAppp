import { SIGNUP, SIGNUP_ERROR, SIGNUP_SUCCESS } from "../actions";
import { user } from "../../API";

/***********************
 * ACTION CREATORS
 ***********************/

export const createStart = (userData) => ({
  type: SIGNUP,
  payload: {

  }
});

export const createSuccess = (userData) => ({
  type: SIGNUP_SUCCESS,
  payload: {}
});

export const createError = (error) => ({
  type: SIGNUP_ERROR,
  error
});

/***********************
 * API WITH DISPATCH
 ***********************/

export const createMobileAccount = (userData) => {
  return (dispatch) => {
    dispatch(createStart(userData));
    return user
      .create()
      .then(
        ({
          data: {
            success,
            log_error,
            ...data
          },
        }) => {
          if (success) {
            // dispatch(
            //   createStart()
            // );
            console.log("Data: ", data);
          } else {
            const {detail, ...error} = JSON.parse(log_error);
            dispatch(createError(detail));
          }
        }
      )
      .catch((error) => {
        dispatch(createError(error));
      });
  };
};