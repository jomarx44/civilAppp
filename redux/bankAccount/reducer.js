import {
  BANK_ACCOUNT_INITIALIZE_REDUCER,
  BANK_ACCOUNT_CREATE,
  BANK_ACCOUNT_CREATE_ERROR,
  BANK_ACCOUNT_CREATE_INITIALIZE,
  BANK_ACCOUNT_CREATE_SUCCESS,
  BANK_ACCOUNT_FETCH,
  BANK_ACCOUNT_FETCH_ERROR,
  BANK_ACCOUNT_FETCH_INITIALIZE,
  BANK_ACCOUNT_FETCH_SUCCESS,
} from "../actions";

const initState = {
  list: {},
  listById: [],
  formData: {},
  status: {
    isFetching: false,
    isCreating: false,
  },
  error: null,
};

export const bankAccount = (state = initState, action) => {
  switch (action.type) {
    case BANK_ACCOUNT_INITIALIZE_REDUCER:
      return initState;
    case BANK_ACCOUNT_CREATE_INITIALIZE:
      return {
        ...state,
        formData: initState.formData,
        status: {
          ...state.status,
          isCreating: initState.status.isCreating,
        },
      };
    case BANK_ACCOUNT_CREATE:
      return {
        ...state,
        formData: action.payload.account,
        status: {
          ...state.status,
          isCreating: true,
        },
      };
    case BANK_ACCOUNT_CREATE_SUCCESS:
      return {
        ...state,
        formData: initState.formData,
        status: {
          ...state.status,
          isCreating: false,
        },
      };
    case BANK_ACCOUNT_CREATE_ERROR:
      return {
        ...state,
        error: action.error,
        status: {
          ...state.status,
          isCreating: false,
        },
      };
    case BANK_ACCOUNT_FETCH_INITIALIZE:
      return {
        ...state,
        list: initState.list,
        listById: initState.listById,
        status: {
          ...state.status,
          isFetching: initState.status.isFetching,
        },
      };
    case BANK_ACCOUNT_FETCH:
      return {
        ...state,
        list: {},
        listById: {},
        status: {
          ...state.status,
          isFetching: true,
        },
      };
    case BANK_ACCOUNT_FETCH_SUCCESS:
      return {
        ...state,
        list: action.payload.list,
        listById: action.payload.listById,
        status: {
          ...state.status,
          isFetching: false,
        },
      };
    case BANK_ACCOUNT_FETCH_ERROR:
      return {
        ...state,
        error: action.error,
        status: {
          ...state.status,
          isFetching: false,
        },
      };

    default:
      return state;
  }
};

export default bankAccount;
