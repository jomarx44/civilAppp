import * as TYPE from "../actions/types";

export const dispatcher = ({dispatch, action, payload}) => {
  // console.log("Dispatched Action: ", action);
  // console.log("Dispatched Payload: ", payload);
  dispatch({
    type: action,
    payload
  })
}

export const optionsDispatch = ({data, dispatch, type}) => {
  if(data.status == "ok" && data.data instanceof Array) {
    const { data: lists } = data;
    let payload = {
      data: {},
      listsById: []
    };

    lists.map((item) => {
      payload.data[item.id_code] = {
        label: item.description,
        value: item.id_code
      }
      payload.listsById.push(item.id_code);
    })

    dispatcher({
      dispatch,
      action: TYPE[`FETCH_${type}_SUCCESS`],
      payload: payload
    })
  } else {
    dispatcher({
      dispatch,
      action: TYPE[`FETCH_${type}_ERROR`]
    })
  }
}

export const getFormattedDate = (date) => {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');

  return month + '/' + day + '/' + year;
}