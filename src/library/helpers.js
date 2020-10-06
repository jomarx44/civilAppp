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

export const toAmountWithTwoDecimals = (amount) => {
  amount = Math.abs(amount);
  amount = amount.toFixed(2);

  let str = amount.split(".");
  if (str[0].length >= 4) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  if (str[1] && str[1].length >= 4) {
    str[1] = str[1].replace(/(\d{3})/g, "$1 ");
  }
  return str.join(".");
};

export const MMMDDYYYYToDateString = (date = "") => {
  const indexOfLastWhiteSpace = date.lastIndexOf(" ");
  return date.substring(0, indexOfLastWhiteSpace);
}

export const chunkSubstr = (str, size) => {
  const numChunks = Math.ceil(str.length / size)
  const chunks = new Array(numChunks)

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size)
  }

  return chunks
}