import {
  CLEAR_LIST,
  FETCH_LIST,
  FETCH_LIST_ERROR,
  FETCH_LIST_SUCCESS,
} from "../actions";

const initState = {
  civilStatus: {
    list: {},
    listByIds: [],
    error: null
  },
  homeOwnership: {
    list: {},
    listByIds: [],
    error: null
  },
  idList: {
    list: {},
    listByIds: [],
    error: null
  },
  jobTitle: {
    list: {},
    listByIds: [],
    error: null
  },
  nationality: {
    list: {},
    listByIds: [],
    error: null
  },
  sourceOfFund: {
    list: {},
    listByIds: [],
    error: null
  },
  error: null,
  status: {
    isFetching: false,
  },
};

export const list = (state = initState, action) => {
  switch (action.type) {
    case CLEAR_LIST:
      if (action.payload.selectedIndex) {
        return {
          ...state,
          [action.payload.selectedIndex]:
            initState[action.payload.selectedIndex],
        };
      }

      return {
        ...initState,
        error: state.error,
      };
    case FETCH_LIST:
      return {
        ...state,
        status: {
          ...state.status,
          isFetching: true,
        },
      };
    case FETCH_LIST_ERROR:
      return {
        ...state,
        [action.payload.selectedIndex]: {
          ...state[action.payload.selectedIndex],
          error: action.error
        },
        status: {
          ...state.status,
          isFetching: false,
        },
      };
    case FETCH_LIST_SUCCESS:
      return {
        ...state,
        [action.payload.selectedIndex]: {
          ...state[action.payload.selectedIndex],
          list: action.payload.list,
          listByIds: action.payload.listByIds
        },
        status: {
          ...state.status,
          isFetching: false,
        },
      };
    default:
      return state;
  }
};

export default list;
