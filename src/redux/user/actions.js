import { CREATE_USER } from "../actions";

/***********************
 * ACTION CREATORS
 ***********************/

export const addCreatedUser = (user) => {
  return {
    type: CREATE_USER,
    payload: {
      user,
    },
  };
};
