import { postOnly, alertBox } from "../../actions/axiosCalls";

// Actions
export const ADD_ATTRIBUTES = "ADD_ATTRIBUTES";

export const PUT_ATTRIBUTES = "PUT_ATTRIBUTES";
export const PUT_ATTRIBUTES_SUCCESS = "PUT_ATTRIBUTES_SUCCESS";
export const PUT_ATTRIBUTES_ERROR = "PUT_ATTRIBUTES_ERROR";

export const FETCH_ATTRIBUTES = "FETCH_ATTRIBUTES";
export const FETCH_ATTRIBUTES_SUCCESS = "FETCH_ATTRIBUTES_SUCCESS";
export const FETCH_ATTRIBUTES_ERROR = "FETCH_ATTRIBUTES_ERROR";

export const REQUEST_ID = "REQUEST_ID";
export const REQUEST_ID_SUCCESS = "REQUEST_ID_SUCCESS";
export const REQUEST_ID_ERROR = "REQUEST_ID_ERROR";

// Action Creators
export const getAttributes = ({ name, access_token }) => {
  const json_data = {
    path: "bf33cd0a-aa9c-4424-9253-bf0d82a101fd/manage",
    body: {
      action: "get_attribute_name",
      attribute_name: name,
      access_token: access_token
    }
  };
  return dispatch => {
    dispatch({
      type: FETCH_ATTRIBUTES
    });
    return postOnly(json_data)
      .then(response => {
        console.log("GETATTR Response: ", response.data);
        dispatch({
          type: FETCH_ATTRIBUTES_SUCCESS,
          payload: response.data[name]
        });
      })
      .catch(error => {
        console.log("Error: ", error);
        dispatch({
          type: FETCH_ATTRIBUTES_ERROR,
          payload: {}
        });
      });
  };
};

export const putAttributes = ({
  attribute_name,
  attribute_value,
  access_token
}) => {
  const json_data = {
    path: "bf33cd0a-aa9c-4424-9253-bf0d82a101fd/manage",
    body: {
      action: "put_attribute_name",
      attribute_name,
      attribute_value,
      access_token
    }
  };

  console.log(json_data);

  return dispatch => {
    // dispatch({
    //   type: PUT_ATTRIBUTES
    // });
    return postOnly(json_data)
      .then(response => {
        console.log("PUTATTR Response: ", response.data);
        dispatch({
          type: response.data.success
            ? PUT_ATTRIBUTES_SUCCESS
            : PUT_ATTRIBUTES_ERROR,
          payload: response.data.success ? response.data : {}
        });
      })
      .catch(error => {
        alertBox("Error has occured!");
        console.log("Error: ", error);
        dispatch({
          type: PUT_ATTRIBUTES_ERROR,
          payload: {}
        });

        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };
};

export const addAttributes = attributes => {
  return dispatch => {
    dispatch({
      type: ADD_ATTRIBUTES,
      attributes
    });
  };
};

export const requestUniqueId = attributes => {
  const json_data = {
    path: "sunsavings/SSCreateAccountRequest",
    body: attributes
  };
  return dispatch => {
    return postOnly(json_data)
      .then(response => {
        console.log("requestUniqueId Response: ", response.data);
        dispatch({
          type:
            response.data.status == "ok"
              ? REQUEST_ID_SUCCESS
              : REQUEST_ID_ERROR,
          payload: response.data.status == "ok" ? response.data.data[0] : {}
        });
      })
      .catch(error => {
        alertBox("Error has occured!");
        console.log("Error: ", error);
        dispatch({
          type: REQUEST_ID_ERROR,
          payload: {}
        });
      });
  };
};
