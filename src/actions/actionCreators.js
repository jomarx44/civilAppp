import {
  SET_PROFILE,
  CLEAR_ACCOUNTS,
  CLEAR_ACCOUNTDETAILS,
  CLEAR_PROFILE,
  CLEAR_TOKENS,
} from "./types";

/**
 * Profile
 */

export const setProfileData = ({
  id,
  sub,
  emails,
  phoneNumbers,
  displayName,
  givenName,
  middleName,
  familyName,
}) => ({
  type: SET_PROFILE,
  payload: {
    id,
    sub,
    emails,
    phoneNumbers,
    name: {
      displayName,
      givenName,
      middleName,
      familyName,
    },
  },
});

export const logout = () => {
  return (dispatch) => {
    // Clear Accounts
    dispatch({
      type: CLEAR_ACCOUNTS,
    });

    // Clear Accounts Details
    dispatch({
      type: CLEAR_ACCOUNTDETAILS,
    });

    // Clear Profile Info
    dispatch({
      type: CLEAR_PROFILE,
    });

    // Clear Tokens
    dispatch({
      type: CLEAR_TOKENS,
    });
  };
};
