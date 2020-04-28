import { postOnly, alertBox, responseData } from "../../actions/axiosCalls";
import * as NavigationService from "../../navigation/NavigationService"

// Actions
export const ADD_ATTRIBUTES = "ADD_ATTRIBUTES";

export const PUT_ATTRIBUTES = "PUT_ATTRIBUTES";
export const PUT_ATTRIBUTES_SUCCESS = "PUT_ATTRIBUTES_SUCCESS";
export const PUT_ATTRIBUTES_ERROR = "PUT_ATTRIBUTES_ERROR";
export const PUT_ATTRIBUTES_INITIALIZE = "PUT_ATTRIBUTES_INITIALIZE";

export const FETCH_ATTRIBUTES = "FETCH_ATTRIBUTES";
export const FETCH_ATTRIBUTES_SUCCESS = "FETCH_ATTRIBUTES_SUCCESS";
export const FETCH_ATTRIBUTES_ERROR = "FETCH_ATTRIBUTES_ERROR";

export const REQUEST_ID = "REQUEST_ID";
export const REQUEST_ID_SUCCESS = "REQUEST_ID_SUCCESS";
export const REQUEST_ID_ERROR = "REQUEST_ID_ERROR";
export const CLEAR_TEMPORARY_KEY = "CLEAR_TEMPORARY_KEY";

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
        
        dispatch({
          type: FETCH_ATTRIBUTES_SUCCESS,
          payload: {
            attribute: {
              [name]: JSON.parse(response.data[name])
            }
          }
        });
      })
      .catch(error => {
        
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
  
  return dispatch => {
    dispatch({
      type: PUT_ATTRIBUTES
    });
    return postOnly(json_data)
      .then(response => {
        
        if(response.data.success) {
          dispatch({
            type: PUT_ATTRIBUTES_SUCCESS,
            payload: response.data
          });
          alertBox("Successfully Created!");
          NavigationService.navigate("Dashboard");
        } else {
          dispatch({
            type: response.data.success
              ? PUT_ATTRIBUTES_SUCCESS
              : PUT_ATTRIBUTES_ERROR,
            payload: response.data.success ? response.data : {}
          });
          alertBox("Failed while creating an account");
        }
        
      })
      .catch(error => {
        alertBox("Error has occured!");
        
        dispatch({
          type: PUT_ATTRIBUTES_ERROR,
          payload: {}
        });

        if (error.response) {
          
          
          
        } else if (error.request) {
          
        } else {
          
        }
        
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
    dispatch({
      type: REQUEST_ID
    });
    
    return postOnly(json_data)
      .then(({data: {status, data}}) => {
        
        dispatch({
          type:
            status == "ok"
              ? REQUEST_ID_SUCCESS
              : REQUEST_ID_ERROR,
          payload: status == "ok" ? data[0] : {}
        });
      })
      .catch(error => {
        alertBox("Error has occured!");
        
        dispatch({
          type: REQUEST_ID_ERROR,
          payload: {}
        });
      });
  };
};
