import {
  FETCH_PROFILE,
  FETCH_PROFILE_ERROR,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_ATTRIBUTE,
  FETCH_PROFILE_ATTRIBUTE_ERROR,
  FETCH_PROFILE_ATTRIBUTE_SUCCESS,
} from "../actions";

import { profile } from "../../API";

/***********************
 * ACTION CREATORS
 ***********************/

export const getProfile = () => ({
  type: FETCH_PROFILE,
});

export const getProfileError = (error) => ({
  type: FETCH_PROFILE_ERROR,
  error,
});

export const getProfileSuccess = (profileData) => ({
  type: FETCH_PROFILE_SUCCESS,
  payload: {
    profileData,
  },
});

export const getProfileAttribute = () => ({
  type: FETCH_PROFILE_ATTRIBUTE
});

export const getProfileAttributeError = (error) => ({
  type: FETCH_PROFILE_ATTRIBUTE_ERROR,
  error
});

export const getProfileAttributeSuccess = (attributeIndex, attributeValue) => ({
  type: FETCH_PROFILE_ATTRIBUTE_SUCCESS,
  payload: {
    attributeIndex,
    attributeValue
  }
});

export const setAttribute = (attributeIndex, attributeValue) => ({
  
})

/***********************
 * API WITH DISPATCH
 ***********************/

export const getProfileAsync = (subId) => {
  return (dispatch) => {
    dispatch(getProfile());
    return profile
      .get(subId)
      .then(({ data: { success, message: errorMessage, action, ...profileData } }) => {
        if (success) {
          const formattedProfileData = { ...profileData };
          Object.keys(formattedProfileData.attributes)
            .map((attributeIndex) => {
              formattedProfileData.attributes[attributeIndex] = JSON.parse(formattedProfileData.attributes[attributeIndex])
            })

          console.log("Formatted: ", formattedProfileData)
          dispatch(getProfileSuccess(formattedProfileData));
        } else {
          dispatch(getProfileError(new Error(errorMessage)))
        }
      })
      .catch((error) => {
        dispatch(getProfileError(error));
      });
  };
};

export const getProfileAttributeAsync = (attributeName, accessToken) => {
  return dispatch => {
    dispatch(getProfileAttribute())
    return profile.getAttribute(attributeName, accessToken)
      .then(({ data: { success, message: errorMessage, ...data} }) => {
        if(success) {
          dispatch(getProfileAttributeSuccess(attributeName, JSON.parse(data[attributeName])))
        } else {
          dispatch(getProfileAttributeError(new Error(errorMessage)));
        }
      })
      .catch((error) => {
        dispatch(getProfileAttributeError(error));
      })
  }
}
