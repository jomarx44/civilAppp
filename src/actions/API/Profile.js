import {
  FETCH_PROFILE,
  FETCH_PROFILE_ERROR,
  FETCH_PROFILE_SUCCESS,
  UPDATE_PROFILE,
  UPDATE_PROFILE_ERROR,
  UPDATE_PROFILE_SUCCESS,
} from "../types";

import { dispatcher } from "../../library/helpers";

export const getProfile = ({ id }) => {
  const json_data = {
    path: "bf33cd0a-aa9c-4424-9253-bf0d82a101fd/manage",
    body: {
      action: "getProfile",
      user_id: id,
    },
  };

  return (dispatch) => {
    dispatcher({
      dispatch,
      action: FETCH_PROFILE,
    });

    return postOnly(json_data)
      .then((response) => {
        if (response.data.success) {
          const { sub, attributes } = response.data;
          const {
            displayName,
            emails,
            id,
            name: { givenName, middleName, familyName },
            phoneNumbers,
          } = response.data.identities[0].idpUserInfo;

          dispatcher({
            dispatch,
            action: FETCH_PROFILE_SUCCESS,
            payload: {
              id,
              sub,
              attributes,
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
        } else {
          dispatcher({
            dispatch,
            action: FETCH_PROFILE_ERROR,
            payload: {
              message: response.data.message.error,
            },
          });
        }
      })
      .catch((error) => {
        alertBox(
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
      });
  };
};
