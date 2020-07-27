import {
  CLEAR_LIST,
  FETCH_LIST,
  FETCH_LIST_ERROR,
  FETCH_LIST_SUCCESS,
} from "../actions";

import { list } from "../../API";

/***********************
 * ACTION CREATORS
 ***********************/

export const clearList = (index = null) => {
  return {
    type: CLEAR_LIST,
    payload: {
      selectedIndex: index,
    },
  };
};

export const getList = () => {
  return {
    type: FETCH_LIST,
  };
};

export const getListError = (index, error) => {
  return {
    type: FETCH_LIST_ERROR,
    error,
    payload: {
      selectedIndex: index
    }
  };
};

export const getListSuccess = (index, {list, listByIds}) => {
  return {
    type: FETCH_LIST_SUCCESS,
    payload: {
      selectedIndex: index,
      list,
      listByIds,
    },
  };
};

/***********************
 * API WITH DISPATCH
 ***********************/

const reformatList = (list) => {
  let formattedList = {
    list: {},
    listByIds: [],
  };

  list.map((item) => {
    formattedList = {
      list: {
        ...formattedList.list,
        [item.id_code]: item,
      },
      listByIds: [...formattedList.listByIds, item.id_code],
    };
  });

  return formattedList;
};

export const getBankAsync = () => {
  return (dispatch) => {
    return list
      .getBank()
      .then(({ data: { data: list, msg: message, status } }) => {
        if (status === "ok" && list) {
          if (Array.isArray(list)) {
            const formattedList = reformatList(list);
            dispatch(getListSuccess("bank", formattedList));
          }
        } 
      })
      .catch((error) => {
        dispatch(getListError("bank", error));
      });
  };
};

export const getBarangayAsync = (cityCode) => {
  return (dispatch) => {
    return list
      .getBarangay(cityCode)
      .then(({ data: { data: list, msg: message, status } }) => {
        if (status === "ok" && list) {
          if (Array.isArray(list)) {
            const formattedList = reformatList(list);
            dispatch(getListSuccess("barangay", formattedList));
          }
        }
      })
      .catch((error) => {
        dispatch(getListError("barangay", error));
      });
  };
};

export const getCityAsync = (citySearchValue) => {
  return (dispatch) => {
    return list
      .getCity(citySearchValue)
      .then(({ data: { data: list, msg: message, status } }) => {
        if (status === "ok" && list) {
          if (Array.isArray(list)) {
            const formattedList = reformatList(list);
            dispatch(getListSuccess("city", formattedList));
          }
        }
      })
      .catch((error) => {
        dispatch(getListError("city", error));
      });
  };
};

export const getCivilStatusAsync = () => {
  return (dispatch) => {
    return list
      .getCivilStatus()
      .then(({ data: { data: list, msg: message, status } }) => {
        if (status === "ok" && list) {
          if (Array.isArray(list)) {
            const formattedList = reformatList(list);
            dispatch(getListSuccess("civilStatus", formattedList));
          }
        }
      })
      .catch((error) => {
        dispatch(getListError("civilStatus", error));
      });
  };
};

export const getHomeOwnershipAsync = () => {
  return (dispatch) => {
    dispatch(getList());
    return list
      .getHomeOwnership()
      .then(({ data: { data: list, msg: message, status } }) => {
        if (status === "ok" && list) {
          if (Array.isArray(list)) {
            const formattedList = reformatList(list);
            dispatch(getListSuccess("homeOwnership", formattedList));
          }
        }
      })
      .catch((error) => {
        dispatch(getListError("homeOwnership", error));
      });
  };
};

export const getIdListAsync = () => {
  return (dispatch) => {
    dispatch(getList());
    return list
      .getIdList()
      .then(({ data: { data: list, msg: message, status } }) => {
        if (status === "ok" && list) {
          if (Array.isArray(list)) {
            const formattedList = reformatList(list);
            dispatch(getListSuccess("idList", formattedList));
          }
        }
      })
      .catch((error) => {
        dispatch(getListError("idList", error));
      });
  };
};

export const getJobTitleAsync = () => {
  return (dispatch) => {
    dispatch(getList());
    return list
      .getJobTitle()
      .then(({ data: { data: list, msg: message, status } }) => {
        if (status === "ok" && list) {
          if (Array.isArray(list)) {
            const formattedList = reformatList(list);
            dispatch(getListSuccess("jobTitle", formattedList));
          }
        }
      })
      .catch((error) => {
        dispatch(getListError("jobTitle", error));
      });
  };
};

export const getNationalityAsync = () => {
  return (dispatch) => {
    dispatch(getList());
    return list
      .getNationality()
      .then(({ data: { data: list, msg: message, status } }) => {
        if (status === "ok" && list) {
          if (Array.isArray(list)) {
            const formattedList = reformatList(list);
            dispatch(getListSuccess("nationality", formattedList));
          }
        }
      })
      .catch((error) => {
        dispatch(getListError("jobTitle", error));
      });
  };
};

export const getSourceOfFundAsync = () => {
  return (dispatch) => {
    dispatch(getList());
    return list
      .getSourceOfFund()
      .then(({ data: { data: list, msg: message, status } }) => {
        if (status === "ok" && list) {
          if (Array.isArray(list)) {
            const formattedList = reformatList(list);
            dispatch(getListSuccess("sourceOfFund", formattedList));
          }
        }
      })
      .catch((error) => {
        dispatch(getListError("sourceOfFund", error));
      });
  };
};