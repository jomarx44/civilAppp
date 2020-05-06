import {
  ADD_ACCOUNT,
  ADD_ACCOUNT_ERROR,
  ADD_ACCOUNT_INITIALIZE,
  ADD_ACCOUNT_SUCCESS,
  ADDFIELD_ACCOUNT_FORMDATA,
  FETCH_ACCOUNTS,
  FETCH_ACCOUNTS_ERROR,
  FETCH_ACCOUNTS_SUCCESS,
  CLEAR_ACCOUNTDETAILS,
  FETCH_ACCOUNTDETAILS,
  FETCH_ACCOUNTDETAILS_ERROR,
  FETCH_ACCOUNTDETAILS_SUCCESS,
  ACCOUNT_LINK_INITIALIZE,
  ACCOUNT_LINK,
  ACCOUNT_LINK_ERROR,
  ACCOUNT_LINK_SUCCESS
} from "../actions/types";

const initialState = {
  accounts: {},
  accountsList: {},
  error: null,
  formData: {},
  isAdding: false,
  isAdded: null,
  isLinking: false,
  isLinked: null,
  isFetching: null,
};

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACCOUNT_INITIALIZE: 
      return {
        ...state,
        formData: {},
        isAdding: false,
        isAdded: null
      };
    
    case ADD_ACCOUNT:
      return {
        ...state,
        isAdding: true,
      };

    case ADD_ACCOUNT_ERROR:
      return {
        ...state,
        isAdding: false,
        isAdded: false,
      };

    case ADD_ACCOUNT_SUCCESS:
      return {
        ...state,
        isAdding: false,
        isAdded: true,
        formData: {},
      };

    case ADDFIELD_ACCOUNT_FORMDATA:
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload.formData,
        },
      };

    // case FETCH_ACCOUNTS:
    //   return {
    //     ...state,
    //     accounts: {},
    //     accountsList: {},
    //     isFetching: true,
    //   };

    // case FETCH_ACCOUNTS_ERROR:
    //   return {
    //     ...state,
    //     isFetching: false,
    //   };

    // case FETCH_ACCOUNTS_SUCCESS:
    //   return {
    //     ...state,
    //     isFetching: false,
    //     accountsList: action.payload.accountsList,
    //   };

    case CLEAR_ACCOUNTDETAILS:
      return {
        ...state,
        accounts: {},
      };

    case FETCH_ACCOUNTDETAILS:
      console.lo;
      return {
        ...state,
        isFetching: true,
      };

    case FETCH_ACCOUNTDETAILS_ERROR:
      return {
        ...state,
        isFetching: false,
      };

    case FETCH_ACCOUNTDETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        accounts: {
          ...state.accounts,
          ...action.payload.account,
        },
      };

    case ACCOUNT_LINK_INITIALIZE:
      return {
        ...state,
        isLinked: null,
        isLinking: false,
      }

    case ACCOUNT_LINK: 
      return {
        ...state,
        isLinked: null,
        isLinking: true,
      }
    
    case ACCOUNT_LINK_ERROR:
      return {
        ...state,
        error: action.payload.error,
        isLinked: false,
        isLinking: false,
      }

    case ACCOUNT_LINK_SUCCESS: 
      return {
        ...state,
        isLinked: true,
        isLinking: false,
      }
    default:
      return state;
  }
};

export default accountReducer;
