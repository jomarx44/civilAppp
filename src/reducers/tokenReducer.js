import {
  STORE_TOKENS,
  CLEAR_TOKENS
} from "../actions/types";

const initialState = {
  tokens: null,
  expires_in: ""
}

export const tokenReducer = (state = initialState, action) => {
  switch(action.type) {
    case STORE_TOKENS: 
      return {
        tokens: action.payload.tokens,
        expires_in: action.payload.expires_in
      };

    case CLEAR_TOKENS:
      return initialState;

    default: 
      return state;
  }
};

export default tokenReducer;