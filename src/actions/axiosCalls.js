import React from "React";
import { Alert } from "react-native";
import { Toast } from "native-base";
import axios from "axios";
import querystring from "querystring";
import Constants from "expo-constants";
import AppJson from "../../app.json";

axios.defaults.baseURL = AppJson.appid.API_URL;
axios.defaults.headers = {
  "Content-Type": "application/json",
  "X-IBM-Client-Id": AppJson.appid.IBM_CLIENT_ID,
  "Access-Control-Allow-Origin": "*",
  DeviceID: Constants.installationId,
  DeviceName: Constants.deviceName
};

// POST METHOD
export const postMethod = json => {
  const params = json["params"];
  let action_type = json["reducer_type"];
  return dispatch => {
    return axios
      .post(json["path"], params)
      .then(response => {
        console.log("POST METHOD RESP: ", response.data);
        if (response.data.success == true) {
          action_type = action_type + "_SUCCESS";
          dispatch(responseData(response.data, action_type, params));
        } else {
          action_type = action_type + "_ERROR";
          dispatch(responseData(response.data, action_type, params));
        }
        if (
          response.data.message &&
          (!response.data.success || json["reducer_type"] != "LOGIN")
        ) {
          alertBox(response.data.message);
        }
      })
      .catch(error => {
        if (json["reducer_type"] === "LOGIN") {
          alertBox("Ooops! There's something wrong connecting to the server.");
          console.log("Respone Error: " + error.request._response);
        } else {
          alertBox(error.request._response);
        }
      });
  };
};

// POST METHOD WITH TOKEN
export const postMethodWithToken = json => {
  const params = json["params"];
  let action_type = json["reducer_type"];

  if (json["token"] !== null) {
    console.log("tokennnnn: " + json["token"]);
    axios.defaults.headers = {
      "Content-Type": "application/json;charset=UTF-8",
      Token: json["token"],
      "Access-Control-Allow-Origin": "*"
    };
  }

  return dispatch => {
    return axios
      .post(json["path"], params)
      .then(response => {
        console.log(JSON.stringify(response));
        if (response.data.success == true || response.data.status == "ok") {
          action_type = action_type + "_SUCCESS";
          console.log("response data " + response.data);
          dispatch(responseData(response.data, action_type, params));
        } else {
          action_type = action_type + "_ERROR";

          dispatch(responseData(response.data, action_type, params));
        }
        //alertBox(response.data.message);
      })
      .catch(error => {
        alertBox(error.request._response);
      });
  };
};

// POST METHOD WITH TOKEN
export const postMethodWithTokenApply = json => {
  const params = json["params"];
  let action_type = json["reducer_type"];

  if (json["token"] !== null) {
    console.log("tokennnnn: " + json["token"]);
    axios.defaults.headers = {
      "Content-Type": "application/json;charset=UTF-8",
      Token: json["token"],
      "Access-Control-Allow-Origin": "*"
    };
  }

  return dispatch => {
    return axios
      .post(json["path"], params)
      .then(response => {
        console.log(JSON.stringify(response));
        if (response.data.message == "Success") {
          action_type = action_type + "_SUCCESS";
          console.log("response data " + JSON.stringify(response.data));
          console.log("action_type: " + action_type);
          dispatch(responseData(response.data, action_type, params));
        } else {
          action_type = action_type + "_ERROR";
          dispatch(responseData(response.data, action_type, params));
        }
        alertBox(response.data.message);
      })
      .catch(error => {
        alertBox(error.request._response.message);
      });
  };
};

// POST METHOD
export const postData = json => {
  const params = json["params"];
  let action_type = json["reducer_type"];
  return dispatch => {
    return axios
      .post(json["path"], params)
      .then(response => {
        if (response.data.status == "ok") {
          action_type = action_type + "_SUCCESS";
          dispatch(responseData(response.data, action_type, params));
        } else {
          action_type = action_type + "_ERROR";
          dispatch(responseData(response.data, action_type, params));
        }
        if (response.data.message && json["reducer_type"] != "LOGIN") {
          alertBox(response.data.message);
        }
      })
      .catch(error => {
        console.log(error);
        alertBox(error.request._response);
      });
  };
};

// GET METHOD
export const getMethod = json => {
  const params = json["params"];
  let action_type = json["reducer_type"];
  return dispatch => {
    return axios
      .get(json["path"], params)
      .then(response => {
        if (response.data.status == "ok") {
          action_type = action_type + "_SUCCESS";
          dispatch(responseData(response.data, action_type, params));
        } else {
          action_type = action_type + "_ERROR";
          dispatch(responseData(response.data, action_type, params));
        }
        if (response.data.message) {
          alertBox(response.data.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};

// GET METHOD WITH TOKEN
export const getMethodWithToken = json => {
  const params = json["params"];
  let action_type = json["reducer_type"];

  if (json["token"] !== null) {
    console.log("tokennnnn" + json["token"]);
    axios.defaults.headers = {
      "Content-Type": "application/json;charset=UTF-8",
      Token: json["token"],
      "Access-Control-Allow-Origin": "*"
    };
  }
  return dispatch => {
    return axios
      .get(json["path"], params)
      .then(response => {
        action_type = action_type + "_SUCCESS";
        console.log("sucess");
        console.log("GET METHOD AXIOS CALLS: ", response.data);
        dispatch(responseData(response.data, action_type, params));
        //alertBox(response.data.message);
      })
      .catch(error => {
        console.log("error" + error);
      });
  };
};

// PUT METHOD
export const putMethod = json => {
  const params = json["params"];
  let action_type = json["reducer_type"];
  return dispatch => {
    return axios
      .put(json["path"], params)
      .then(response => {
        if (response.data.status == "ok") {
          action_type = action_type + "_SUCCESS";
          dispatch(responseData(response.data, action_type, params));
        } else {
          action_type = action_type + "_ERROR";
          dispatch(responseData(response.data, action_type, params));
        }
        if (response.data.message) {
          alertBox(response.data.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};

// PUT METHOD
export const putMethodWithToken = json => {
  const params = json["params"];
  let action_type = json["reducer_type"];

  if (json["token"] !== null) {
    console.log("tokennnnn" + json["token"]);
    axios.defaults.headers = {
      "Content-Type": "application/json;charset=UTF-8",
      Token: json["token"],
      "Access-Control-Allow-Origin": "*"
    };
  }

  return dispatch => {
    return axios
      .put(json["path"], params)
      .then(response => {
        if (response.data.status == "ok") {
          action_type = action_type + "_SUCCESS";
          dispatch(responseData(response.data, action_type, params));
        } else {
          action_type = action_type + "_ERROR";
          dispatch(responseData(response.data, action_type, params));
        }
        if (
          response.data.message &&
          json["reducer_type"] == "UPDATE_PASSWORD"
        ) {
          alertBox(response.data.message);
        }
        // if (response.data.message && json["reducer_type"]) {
        //   alertBox(response.data.message);
        // }
      })
      .catch(error => {
        console.log(error);
      });
  };
};

//DELETE
export const deleteData = json => {
  const url = getPath(json);
  return dispatch => {
    return axios
      .get(url)
      .then(response => {
        dispatch(success(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

// GET METHOD
export const getData = json => {
  const url = getPath(json);
  let action_type = json["reducer_type"];
  ey;
  return dispatch => {
    return axios
      .get(url)
      .then(response => {
        if (response.data.status == "ok") {
          action_type = action_type + "_SUCCESS";
          dispatch(responseData(response.data, action_type, {}));
        } else {
          action_type = action_type + "_ERROR";
          dispatch(responseData(response.data, action_type, {}));
        }
      })
      .catch(error => {
        throw error;
      });
  };
};

export const responseData = (data, type, params) => {
  return {
    type: type,
    payload: data,
    params: params
  };
};

export const dispatchOnly = json => {
  const params = json["params"];
  let action_type = json["reducer_type"];
  return dispatch => {
    dispatch({ type: action_type, payload: {} });
  };
};

export const dispatchWithPayload = json => {
  const params = json["params"];
  let action_type = json["reducer_type"];
  let payload = json["payload"];
  console.log("dispatchWithPayload ->: " + JSON.stringify(json));
  return dispatch => {
    dispatch({ type: action_type, payload: payload });
  };
};

const getPath = json => {
  const path = json["path"];
  const params = querystring.stringify(json["params"]);
  const url = path + "?" + params;
  return url;
};

export const alertBox = error => {
  Alert.alert("Sun Savings Bank", error);
};
