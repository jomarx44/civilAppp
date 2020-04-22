import * as TYPE from "../actions/types";

export const dispatcher = ({ dispatch, action, payload }) => {
  dispatch({
    type: action,
    payload,
  });
};

export const optionsDispatch = ({ data, dispatch, type }) => {
  if (data.status == "ok" && data.data instanceof Array) {
    const { data: lists } = data;
    let payload = {
      data: {},
      listsById: [],
    };

    lists.map((item) => {
      payload.data[item.id_code] = {
        label: item.description,
        value: item.id_code,
      };
      payload.listsById.push(item.id_code);
    });

    dispatcher({
      dispatch,
      action: TYPE[`FETCH_${type}_SUCCESS`],
      payload: payload,
    });
  } else {
    dispatcher({
      dispatch,
      action: TYPE[`FETCH_${type}_ERROR`],
    });
  }
};

export const getFormattedDate = (date) => {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return month + "/" + day + "/" + year;
};

export const APIErrorLogging = (caller, error) => {
  // if(__DEV__) {
  //   if (error.response) {
  //     // The request was made and the server responded with a status code
  //     // that falls out of the range of 2xx
  //     console.warn(
  //       `${caller} request was made but the sercer responded with a status code that falls out of the range of 2xx`
  //     );
  //     console.warn(`${caller} Response Data: `, error.response.data);
  //     console.warn(`${caller} Response Status: `, error.response.status);
  //     console.warn(`${caller} Response Headers: `, error.response.headers);
  //   } else if (error.request) {
  //     // The request was made but no response was received
  //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //     // http.ClientRequest in node.js
  //     console.warn(`${caller} request was made but no response was received`)
  //     console.warn(`${caller} Request: `,error.request);
  //   } else {
  //     // Something happened in setting up the request that triggered an Error
  //     console.warn(`Something happened in setting up ${caller} request that triggered an Error`);
  //     console.warn("Error", error.message);
  //   }
    
  //   console.warn(`${caller} Config: `, error.config);
  // }
};
