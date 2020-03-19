import {
  SET_PROFILE, LOGOUT
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
  familyName
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
      familyName
    }
  }
});

export const logout = () => ({
  type: LOGOUT,
  payload: {}
})
